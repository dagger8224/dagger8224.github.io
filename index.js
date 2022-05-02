export const onLoading = language_packages => {
    const language = localStorage.getItem('language') || 'en-us';
    return {
        language,
        $: language_packages[language],
        html: '',
        defaultHtml: '',
        isLoading: true
    };
};

export const onLoaded = () => require(['vs/editor/editor.main'], () => {
    const resultElement = document.querySelector('#result');
    resultElement && resultElement.scrollTo(0, 0);
    window.$editor && window.$editor.setScrollPosition({scrollTop: 0});
    monaco.editor.setModelLanguage(window.$editor.getModel(), 'html');
});

export const sentry = ($scope, $nextRouter) => {
    console.log('sentry');
    const shouldBlocked = $nextRouter.path == '/blocked';
    if (shouldBlocked) {
        console.warn('redirect is blocked by sentry directive');
        return true;
    } else {
        $scope.isLoading = true;
    }
};

const converter = content => ((content.type == 'namespace') && (`There are "${ content.children.length }" module(s) declared:<br/>${ content.children.map((child, index) => `${ index + 1 }. name: "${ child.name }", type: "${ child.type }", state: "${ child.state }", content: "${ converter(child) }".`).join('<br/>') }`)) || ((content instanceof Node) && content.toString()) || ((content.type == 'template') && converter(content.module.node)) || ((content.type == 'style') && converter(content.resolvedContent)) || ((content.type == 'script') && Object.keys(content.module).map(key => `${ key }: ${ content.module[key] }`)) || ((content.type == 'string') && content.module) || JSON.stringify(content.module);

window.$extractRouter = (index, router) => `router ${ index + 1 }. scenarios: "${ JSON.stringify(router.scenarios) }", constants: "${ JSON.stringify(router.constants) }", variables: "${ JSON.stringify(router.variables) }", modules: "${ JSON.stringify(router.modules) }", tailable: "${ router.tailable }"`;

export const updateResult = ($router, html) => {
    if (html) {
        const errorInfoPrefix = `<span style='color: red;'>Please open browser's console panel to see more detail error info.<br/>`;
        try {
            if ($router.schemes.type == 'module') {
                const moduleProfile = window.$ModuleProfile(JSON.parse(html));
                let resolver = null;
                const promise = new Promise(_resolver => (resolver = _resolver));
                window.onunhandledrejection = error => resolver(`${ errorInfoPrefix }${ error.reason.stack }</span>`);
                moduleProfile.resolve().then(moduleProfile => resolver(converter(moduleProfile)));
                return promise;
            } else if ($router.schemes.type == 'router') {
                window.$rootRouter = new window.$Router(JSON.parse(html).scenarios);
                return `<div +loading="{ value: '', path: '', scenarios: {}, routers: [], matched: false, showResult: false }"><input style="width: 500px;" placeholder="input hash value (starts with '/') to validate here" $value="value"></br><button +click="path = value, routers = [], matched = $rootRouter.match(routers, scenarios, value.split('/')), showResult = true;">click to validate</button></br><div $style="\`color: ${ '${ matched ? \'green\' : \'red\' }' }\`" $exist="showResult">The input hash value ${ '"${ path }"' } is ${ '"${ matched ? \'matched\' : \'unmatched\' }"' } with the specified routing configs, the matched routing scenarios are: ${ '"${ routers.slice().reverse().map((router, index) => window.$extractRouter(index, router)).join(\', \') }"' }.</div><div $style="\`color: ${ '${ matched ? \'green\' : \'red\' }' }\`" $exist="showResult">The resolved schemes are: ${ '"${ JSON.stringify(Object.assign({}, ...routers.slice().reverse().map(router => router.variables), ...routers.slice().reverse().map(router => router.constants))) }"' }.</div></div>`; 
            }
        } catch (error) {
            return `${ errorInfoPrefix }${ error.message }</span>`;
        }
    }
    return html;
};
