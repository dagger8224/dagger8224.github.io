/* ************************************************************************
*  <copyright file="dagger.release.js" company="DAGGER TEAM">
*  Copyright (c) 2016, 2021 All Right Reserved
*
*  THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
*  KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
*  IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
*  PARTICULAR PURPOSE.
*  </copyright>
*  ***********************************************************************/

export default ((daggerOptions = { integrity: true }, rootNodeContexts = null, rootNodeProfiles = [], emptier = () => Object.create(null), forEach = (iterators, processor) => {
    if (!iterators) { return; }
    const length = iterators.length || 0;
    for (let index = 0; index < length; ++index) { processor(iterators[index], index); }
}, hashTableResolver = (...array) => {
    const hashTable = emptier();
    return forEach(array, key => (hashTable[key] = true)) || hashTable;
}, emptyObject = emptier(), head = document.head, htmlScope = emptier(), meta = Symbol('meta'), queueingControllerSet = new Set(), rootScope = Object.assign(emptier(), { $modules: emptier(), $router: emptier(), $validator: () => {}}), runtimeContext = emptier(), sentrySet = new Set(), templateCache = new Map(), runtimeContextResolver = ((defaultContext = { controller: null, sensitive: false, topology: null }) => (context = null) => Object.assign(runtimeContext, defaultContext, context))(), closureResolver = (expression, count = 1) => {
    if (is(count, 1)) {
        return `_$$_dg_scope => { with (_$$_dg_scope) { return ${ expression }; } }`;
    } else {
        const scopeNames = new Array(count).fill().map((item, index) => `_$$_dg_scope_${ index }`);
        return `(${ scopeNames.join(', ') }) => { ${ scopeNames.map(name => `with (${ name })`).join(' ') } { return ${ expression }; } }`;
    }
}, configResolver = (baseElement, base = document.baseURI) => {
    const configContainer = querySelector(baseElement, 'script[type="dagger/configs"]'), src = configContainer.getAttribute('src');
    configContainer.hasAttribute('base') && (base = new URL(configContainer.getAttribute('base') || '', base).href);
    return src ? remoteResourceResolver(new URL(src, base), configContainer.integrity).then(({ content }) => ({ base, content: jsonResolver(content) })) : { base, content: jsonResolver(configContainer.textContent) };
}, destructor = target => forEach(Reflect.ownKeys(target), key => Reflect.deleteProperty(target, key)), functionResolver = expression => new Function(`return ${ expression };`)(), is = (object1, object2) => Object.is(object1, object2), isInstanceOf = (object, constructor = Object) => (object instanceof constructor), isString = object => is(typeof object, 'string'), jsonResolver = content => JSON.parse(content), ownKeys = target => Reflect.ownKeys(target).filter(key => !is(key, meta)), quoteResolver = string => `'${ string }'`, serializer = ([resolver, ...nextResolvers], token = { stop: false }) => {
    if (token.stop) { return; }
    if (isInstanceOf(resolver, Promise)) {
        return resolver.then(resolver => serializer([resolver, ...nextResolvers], token));
    } else if (isInstanceOf(resolver, Function)) {
        return serializer([resolver(null, token), ...nextResolvers], token);
    } else {
        return nextResolvers.length ? serializer([nextResolvers.shift()(resolver, token), ...nextResolvers], token) : resolver;
    }
}, querySelector = (baseElement, selector, all = false) => baseElement[all ? 'querySelectorAll' : 'querySelector'](selector), remoteResourceResolver = (url, integrity = '') => fetch(url, daggerOptions.integrity && integrity ? { integrity: `sha256-${ integrity }` } : {}).then(response => {
    if (response.ok) {
        const type = response.headers.get('content-type');
        return response.text().then(content => ({ content, type }));
    }
}).catch(() => {}), safeDataResolver = expression => { try { return JSON.parse(expression.replace(/'/g, '"')); } catch (error) { return expression; } }, templateResolver = content => {
    const template = document.createElement('template');
    template.innerHTML = content;
    return template.content;
}, selectorInjector = (element, selectors) => forEach(element.children, child => {
    if (is(child.tagName, 'TEMPLATE')) {
        child.getAttribute('$html') && child.setAttribute('dg_scoped_styles', selectors.join(','));
        selectorInjector(child.content, selectors);
    } else if (isInstanceOf(child, HTMLElement)) {
        forEach(selectors, selector => child.setAttribute(selector, ''));
    }
}), textResolver = (data, trim = true) => {
    if (!isString(data)) {
        if ((data == null) || Number.isNaN(data)) { return ''; }
        if (isInstanceOf(data)) { return JSON.stringify(data); }
        data = String(data);
    }
    return trim ? data.trim() : data;
}, valueResolver = node => node && Reflect.has(node[meta] || {}, 'value') ? node[meta].value : (node.value || node.textContent), Controller = ((generalUpdater = (data, node, nodeContext, { name }) => is(data) ? node.removeAttribute(name) : node.setAttribute(name, textResolver(data)), nodeUpdater = ((changeEvent = new Event('change'), eachResolver = (index, key, value, children, childrenMap, newChildrenMap, indexName, keyName, itemName, nodeContext, profile, sliceClosures, parentNode) => {
    let matchedNodeContext = null;
    const matchedArray = childrenMap.get(value);
    if (matchedArray) {
        matchedNodeContext = matchedArray.shift();
        matchedArray.length || childrenMap.delete(value);
        if (index > 0) {
            const previousNodeContext = children[index - 1], landmark = matchedNodeContext.landmark;
            if (is(previousNodeContext.landmark.compareDocumentPosition(landmark), Node.DOCUMENT_POSITION_PRECEDING)) {
                const upperBoundary = matchedNodeContext.upperBoundary, array = [upperBoundary];
                let node = upperBoundary;
                while (!is(node, landmark)) {
                    node = node.nextSibling;
                    array.push(node);
                }
                const fragment = document.createDocumentFragment();
                fragment.append(...array);
                parentNode.insertBefore(fragment, previousNodeContext.landmark.nextSibling);
            }
        }
        matchedNodeContext.index = index;
        children[index] = matchedNodeContext;
        matchedNodeContext.resolvedSliceScope[keyName] = key;
        matchedNodeContext.resolvedSliceScope[indexName] = index;
    } else {
        matchedNodeContext = new NodeContext(profile, sliceClosures, nodeContext, index, { [keyName]: key, [itemName]: value, [indexName]: index });
    }
    const newMatchedArray = newChildrenMap.get(value);
    newMatchedArray ? newMatchedArray.push(matchedNodeContext) : newChildrenMap.set(value, [matchedNodeContext]);
}, selectedResolver = (node, data, multiple) => {
    const value = valueResolver(node);
    return multiple ? (data || []).some(item => is(item, value)) : is(data, value);
}, styleUpdater = (resolvedStyles, content) => {
    if (!content) { return; }
    const [key, value = ''] = content.split(':').map(item => item.trim());
    resolvedStyles[key] = value;
}, timeNormalizer = (data, padLength = 2) => String(data).padStart(padLength, '0')) => ({
    $boolean: (data, node, nodeContext, { name }) => data ? node.setAttribute(name, '') : node.removeAttribute(name),
    checked: (data, node, { parentNode }, { decorators }) => {
        const { tagName, type } = node, isOption = is(tagName, 'OPTION'), isRadio = is(type, 'radio');
        if (isOption || (is(tagName, 'INPUT') && (isRadio || is(type, 'checkbox')))) {
            let nodes = null;
            data = !!data;
            if (isOption) {
                if (is(data, node.selected)) { return; }
                node.selected = data;
                const select = parentNode;
                if (select) {
                    !select.multiple && data && (nodes = querySelector(select, 'option', true));
                    if (!select.$changeEvent) {
                        select.$changeEvent = true;
                        select.addEventListener('change', event => forEach(querySelector(event.target, 'option', true), option => option.dispatchEvent(changeEvent)));
                    }
                }
            } else {
                node.checked = data;
                isRadio && data && (nodes = querySelector(decorators.scope ? querySelector(document, decorators.scope) : parentNode, `input[type="radio"][name="${ node.name }"]`, true));
            }
            nodes && forEach(nodes, node => node.dispatchEvent(changeEvent));
        } else {
            generalUpdater(data, node, null, { name: 'checked' });
        }
    },
    class: (data, node, { profile: { classNames } }) => {
        if (data) {
            const classNameSet = new Set(classNames);
            if (Array.isArray(data)) {
                forEach(data, className => classNameSet.add(textResolver(className)));
            } else if (isInstanceOf(data)) {
                forEach(Object.entries(data), ([key, value]) => value && classNameSet.add(key.trim()));
            } else {
                classNameSet.add(textResolver(data));
            }
            node.className = [...classNameSet].join(' ').trim();
        } else {
            classNames ? (node.className = classNames.join(' ')) : node.removeAttribute('class');
        }
    },
    each: (data, node, nodeContext, { decorators }) => {
        data = Object.entries(data || emptyObject);
        const { children, childrenMap = new Map(), profile, parentNode } = nodeContext;
        if (!data.length) { return childrenMap.clear() || nodeContext.removeChildren(); }
        let { item: itemName = 'item', key: keyName = 'key', index: indexName = 'index' } = decorators;
        is(itemName, true) && (itemName = 'item');
        is(keyName, true) && (keyName = 'key');
        is(indexName, true) && (indexName = 'index');
        const newChildrenMap = new Map(), sliceClosures = nodeContext.closures.slice;
        forEach(data, ([key, value], index) => eachResolver(index, key, value, children, childrenMap, newChildrenMap, indexName, keyName, itemName, nodeContext, profile, sliceClosures, parentNode));
        children.length = data.length;
        nodeContext.childrenMap = newChildrenMap;
        childrenMap.forEach(array => forEach(array, nodeContext => nodeContext.destructor()));
        childrenMap.clear();
    },
    exist: (data, node, nodeContext) => data ? (node || nodeContext.create()) : nodeContext.destroy(),
    file: () => {},
    focus: (data, node, nodeContext, { decorators: { prevent = false } }) => data ? node.focus({ preventScroll: prevent }) : node.blur(),
    html: (data, node, nodeContext) => {
        data = textResolver(data);
        nodeContext.removeChildren();
        if (!data) { return; }
        const rootNodeProfiles = [], profile = nodeContext.profile, fragment = templateResolver(data);
        if (!node) {
            const styles = profile.node.getAttribute('dg_scoped_styles');
            styles && selectorInjector(fragment, styles.split(','));
        }
        Reflect.construct(NodeProfile, [fragment, profile.namespace, rootNodeProfiles, null, true]);
        if (rootNodeProfiles.length) {
            const scopes = nodeContext.scopes;
            const count = scopes.length;
            forEach(rootNodeProfiles, (nodeProfile, index) => Promise.all(nodeProfile.promises || []).then(() => new NodeContext(nodeProfile, functionResolver(closureResolver(nodeProfile.closures, count))(...scopes), nodeContext, index, null, scopes, (nodeProfile.landmark || nodeProfile.node).parentNode)));
        }
        node ? node.appendChild(fragment) : nodeContext.parentNode.insertBefore(fragment, nodeContext.landmark);
    },
    selected: (data, node) => {
        const { type, tagName } = node, isSelect = is(tagName, 'SELECT');
        if (isSelect || (is(tagName, 'INPUT') && (is(type, 'checkbox') || is(type, 'radio')))) {
            const multiple = isSelect ? node.multiple : is(type, 'checkbox');
            if (isSelect) {
                const nodes = querySelector(node, 'option', true);
                forEach(nodes, option => (option.selected = selectedResolver(option, data, multiple)));
                multiple || forEach(nodes, node => node.dispatchEvent(changeEvent));
            } else {
                node.checked = selectedResolver(node, data, multiple);
            }
        } else {
            generalUpdater(data, node, null, { name: 'selected' });
        }
    },
    style: (data, node, { profile: { inlineStyle, styles } }) => {
        if (data) {
            const resolvedStyles = { ...styles };
            if (Array.isArray(data)) {
                forEach(data, item => styleUpdater(resolvedStyles, textResolver(item)));
            } else if (isInstanceOf(data)) {
                forEach(Object.entries(data), ([key, value]) => (resolvedStyles[key.trim()] = textResolver(value)));
            } else {
                forEach(textResolver(data).split(';'), item => styleUpdater(resolvedStyles, item.trim()));
            }
            node.style.cssText = Object.entries(resolvedStyles).filter(([key, value]) => value).map(([key, value]) => `${ key }: ${ value }; `).join('').trim();
        } else {
            inlineStyle ? node.setAttribute('style', inlineStyle) : node.removeAttribute('style');
        }
    },
    text: (data, node) => {
        data = textResolver(data);
        is(data, node.textContent) || (node.textContent = data);
    },
    value: (data, node, nodeContext, { decorators }) => {
        nodeContext.value = data;
        const { tagName, type } = node, isInput = is(tagName, 'INPUT');
        if (isInput) {
            const isDate = is(type, 'date') || is(type, 'datetime-local');
            if (isInstanceOf(data, Date)) {
                if (isDate || is(type, 'week')) {
                    node.valueAsNumber = data;
                } else if (is(type, 'month')) {
                    node.value = `${ data.getUTCFullYear() }-${ timeNormalizer(data.getUTCMonth() + 1) }`;
                } else if (is(type, 'time')) {
                    const step = node.step || 0;
                    let value = `${ timeNormalizer(data.getUTCHours()) }:${ timeNormalizer(data.getUTCMinutes()) }`;
                    if (step % 60) {
                        value = `${ value }:${ timeNormalizer(data.getUTCSeconds()) }`;
                        (step % 1) && (value = `${ value }.${ timeNormalizer(data.getUTCMilliseconds(), 3) }`);
                    }
                    node.value = value;
                } else {
                    node.value = data;
                }
            } else {
                data = textResolver(data, decorators.trim || false);
                isDate ? (node.valueAsNumber = new Date(data)) : (node.value = data);
            }
        } else {
            node.value = textResolver(data, decorators.trim || false);
        }
    }
}))(), booleanDirectiveNames = hashTableResolver('autocapitalize', 'autocomplete', 'contenteditable', 'controls', 'disabled', 'draggable', 'loop', 'multiple', 'muted', 'open', 'preload', 'readonly', 'required', 'reversed', 'spellcheck', 'translate', 'wrap'), lazyDirectiveNames = hashTableResolver('checked', 'focus', 'selected'), Controller = class {
    constructor (nodeContext, { name, decorators = emptyObject, processor }) {
        this.nodeContext = nodeContext, this.decorators = decorators, this.processor = processor, this.topologySet = new Set(), this.visitedTopologySet = new Set();
        if (name) {
            this.name = name;
            lazyDirectiveNames[name] && (this.lazy = true);
            this.updater = (booleanDirectiveNames[name] && nodeUpdater.$boolean) || nodeUpdater[name] || generalUpdater;
            const node = nodeContext.node;
            if (is(name, 'selected') && node && is(node.tagName, 'SELECT')) { // watch children update
                this.observer = new MutationObserver(() => this.trigger());
                this.observer.observe(node, { childList: true });
            }
        }
    }
    destructor () {
        this.topologySet.forEach(topology => topology.unsubscribe(this));
        this.topologySet.clear();
        this.visitedTopologySet.clear();
        this.observer && this.observer.disconnect();
        destructor(this);
    }
    trigger (force = true) {
        queueingControllerSet.delete(this);
        if (force || (this.topologySet && [...this.topologySet].some(topology => !is(topology[meta].oldValue, topology[meta].value)))) {
            if (!this.processor) { return; }
            this.topologySet.clear();
            this.visitedTopologySet.clear();
            const stashedContext = { ...runtimeContext };
            runtimeContextResolver({ controller: this, sensitive: this.decorators.sensitive || false });
            serializer([this.processor(), data => runtimeContextResolver(stashedContext) && this.update(data)]);
        }
        queueMicrotask(() => this.topologySet && this.topologySet.forEach(topology => Reflect.deleteProperty(topology[meta], 'oldValue')));
        return this;
    }
    update (data) {
        if (!this.updater) { return; }
        const nodeContext = this.nodeContext, node = nodeContext.node;
        (this.decorators.immutable && is(data, this.data)) || serializer([(!(node || {}).isConnected && this.lazy) ? queueMicrotask(() => this.updater(data, node, nodeContext, this)) : this.updater(data, node, nodeContext, this), () => (this.data = data)]);
    }
}) => Controller)(), ModuleProfile = ((elementProfileCache = new Map(), embeddedType = { json: 'dagger/json', namespace: 'dagger/configs', script: 'dagger/script', style: 'dagger/style', string: 'dagger/string'  }, integrityProfileCache = emptier(), mimeType = { html: 'text/html', json: 'application/json', script: ['application/javascript', 'javascript/esm', 'text/javascript'], style: 'text/css' }, pathRegExp = /^[$a-zA-Z-_]{1}[\w-$]*(\.[$a-zA-Z-_]{1}[\w-$]*)*$/, relativePathRegExp = /'BASE\(([-\w@:%.\/+~#=$]+)\)'|"BASE\(([-\w@:%.\/+~#=$]+)\)"/g, resolvedType = { json: 'json', namespace: 'namespace', script: 'script', style: 'style', string: 'string', template: 'template' }, remoteUrlRegExp = /^(http:\/\/|https:\/\/|\/|\.\/|\.\.\/)/i, status = { resolved: 'resolved', resolving: 'resolving', unresolved: 'unresolved' }, configNormalizer = ((resolvedTypes = hashTableResolver(...Object.keys(resolvedType).map(type => `@${ type }`)), normalizer = (config, type) => {
    (Array.isArray(config) || !isInstanceOf(config)) && (config = { uri: config, candidates: config });
    config.candidates && (Array.isArray(config.candidates) || (config.candidates = [config.candidates]));
    Object.assign(config, (config.candidates || []).find(item => isInstanceOf(item) && (!Reflect.has(item, 'media') || matchMedia(item.media).matches) && (!Reflect.has(item, 'condition') || (item.condition && (functionResolver(item.condition))))));
    config.type || (config.type = type);
    config.uri && (Array.isArray(config.uri) || (config.uri = [config.uri]));
    return config;
}) => config => forEach(Object.keys(config), key => resolvedTypes[key] && isInstanceOf(config[key]) ? (forEach(Object.entries(config[key]), ([name, value]) => {
    config[name] = normalizer(value, key.substr(1));
}) || Reflect.deleteProperty(config, key)) : (config[key] = normalizer(config[key]))) || config)(), ruleResolver = (sheet, rule, name) => rule.cssRules ? forEach(rule.cssRules, rule => ruleResolver(sheet, rule, name)) : sheet.insertRule(`${ rule.selectorText.split(',').map(selector => (selector = selector.trim()) && `${ selectorRegExp.test(selector) ? selector.replace(selectorRegExp, `[${ name }]$1`) : `${ selector }[${ name }]` }, [${ name }] ${ selector }`).join(', ') }{${ rule.style.cssText }}`), selectorRegExp = /([\s:+>~])/, styleResolver = (content, name = '', disabled = false) => {
    const style = document.createElement('style');
    content && (style.textContent = content);
    head.appendChild(style);
    style.disabled = disabled;
    style.setAttribute('name', name);
    return style;
}, ModuleProfile = class {
    constructor (config = {}, base = '', name = '', parent = null) {
        this.name = name;
        this.module = { [meta]: this };
        this.state = status.unresolved;
        if (parent) {
            this.resolveParent(parent);
            this.path = parent.path ? `${ parent.path }.${ name }` : name, this.baseElement = parent.baseElement;
        } else {
            this.path = name, this.baseElement = head;
        }
        const { integrity, uri, type } = config;
        let isTypeValid = resolvedType[type];
        if (Reflect.has(config, 'content')) {
            this.content = config.content;
        } else if (uri) {
            this.URIs = uri;
            isTypeValid || (isTypeValid = !type);
        }
        type && (this.type = type);
        daggerOptions.integrity && integrity && (this.integrity = integrity);
        this.config = config, this.promise = new Promise(resolver => (this.resolver = resolver)), this.base = new URL(config.base || base, (parent || {}).base || document.baseURI).href;
        (Reflect.has(config, 'scoped') && !config.scoped) || (this.scoped = true);
    }
    extract (styleModuleSet = null) {
        if (!this.extracted) {
            if (is(this.type, resolvedType.style)) {
                this.parent.styleModules.push(this.module);
                this.extracted = true;
            } else if (!is(this.type, resolvedType.template)) {
                const isNamespace = is(this.type, resolvedType.namespace);
                if (isNamespace) {
                    this.styleModules || (this.styleModules = []);
                    this.extracted = Object.assign(emptier(), ...this.children.map(moduleProfile => moduleProfile.extract()));
                } else {
                    this.extracted = (!isInstanceOf(this.module) || Array.isArray(this.module)) ? this.module : Object.assign(emptier(), this.module);
                }
                this.extracted = (!isNamespace && this.config.anonymous) ? this.extracted : Object.assign(emptier(), { [this.name]: this.extracted });
            }
        }
        this.parent ? (this.styleModules || []).length && (this.parent.styleModules = [...(this.parent.styleModules || []), ...this.styleModules]) : (styleModuleSet && forEach(this.styleModules, module => styleModuleSet.add(module)));
        return this.extracted;
    }
    fetch (paths) {
        Array.isArray(paths) || (paths = paths.split('.'));
        const path = paths.shift().trim(), moduleProfile = (this.children || []).find(child => is(child.name, path));
        return paths.length ? moduleProfile.resolve().then(moduleProfile => moduleProfile.fetch(paths)) : moduleProfile.resolve();
    }
    resolve () {
        if (!is(this.state, status.unresolved)) { return this.promise; }
        this.resolveState(status.resolving);
        let pipeline = [resolvedContent => this.resolveModule(resolvedContent), module => this.resolved(module)];
        if (!Reflect.has(this, 'content')) {
            pipeline = [...this.URIs.map(uri => (data, token) => (token.stop = !!data) || this.resolveURI(uri))];
        } else {
            const content = this.content;
            if ([resolvedType.namespace, resolvedType.json].includes(this.type)) {
                pipeline = [is(this.type, resolvedType.namespace) ? this.resolveNamespace(content) : content, ...pipeline];
            } else {
                pipeline = [this.resolveContent(content), ...pipeline];
            }
        }
        serializer(pipeline);
        return this.promise;
    }
    resolveContent (content) {
        this.content = content.trim();
        const type = this.type;
        if (is(type, resolvedType.namespace)) {
            this.baseElement = templateResolver(content);
            return serializer([configResolver(this.baseElement, this.base), ({ base, content }) => this.resolveNamespace(content, base)]);
        } else if (is(type, resolvedType.script)) {
            const resolvedContent = content.replace(relativePathRegExp, (match, url) => quoteResolver(new URL(url, this.base)));
            return import(`data:text/javascript, ${ encodeURIComponent(resolvedContent) }`);
        } else if (is(type, resolvedType.template)) {
            const fragment = templateResolver(content), pipeline = [], styles = this.config.style;
            styles && pipeline.push(Promise.all((Array.isArray(styles) ? styles : [styles]).map(path => this.parent.fetch(path).then(style => style.module.getAttribute('name')))).then(names => selectorInjector(fragment, names.filter(name => name))));
            pipeline.push(() => {
                fragment[meta] = this;
                const nodeProfile = new NodeProfile(fragment, this.parent);
                return Promise.all(nodeProfile.promises || []).then(() => nodeProfile);
            });
            return serializer(pipeline);
        } else if (is(type, resolvedType.style)) {
            return styleResolver(content, `dg_style_module_content-${ this.path.replace(/\./g, '_') }`, true);
        } else if (is(type, resolvedType.json)) {
            return jsonResolver(content);
        } else if (is(type, resolvedType.string)) {
            return this.content;
        }
    }
    resolved (module) {
        this.module = module;
        this.resolveState(status.resolved);
        this.resolver(this);
        return this;
    }
    resolveEmbeddedType (element) {
        if (this.type) { return; }
        const { tagName, type } = element, isScript = is(tagName, 'SCRIPT');
        if (is(tagName, 'TEMPLATE')) {
            this.type = resolvedType.template;
        } else if (isScript && is(type, embeddedType.namespace)) {
            this.type = resolvedType.namespace;
            return this.resolveNamespace(jsonResolver(element.innerHTML), element.getAttribute('base') || this.base);
        } else if (isScript && is(type, embeddedType.script)) {
            this.type = resolvedType.script;
        } else if (isScript && is(type, embeddedType.json)) {
            this.type = resolvedType.json;
        } else if (is(tagName, 'STYLE') && is(type, embeddedType.style)) {
            this.type = resolvedType.style;
        } else {
            this.type = resolvedType.string;
        }
    }
    resolveModule (resolvedContent) {
        this.resolvedContent = resolvedContent;
        let module = resolvedContent;
        const type = this.type;
        if (is(type, resolvedType.namespace)) {
            module = emptier();
            this.children = resolvedContent;
            forEach(resolvedContent, moduleProfile => (module[moduleProfile.name] = moduleProfile.module));
        } else if (is(type, resolvedType.style)) {
            if (this.scoped) {
                const name = `dg_style_module-${ this.path.replace(/\./g, '_') }`, style = styleResolver('', name, true), sheet = style.sheet;
                forEach(module.sheet.cssRules, rule => ruleResolver(sheet, rule, name));
                module = style;
            }
        } else if (!is(type, resolvedType.template) && !is(type, resolvedType.string) && this.config.converter) {
            module = functionResolver(`$module => (${ this.config.converter })`)(module);
        }
        return module;
    }
    resolveNamespace (config, base = this.base) {
        this.parent && configNormalizer(config);
        this.children = Object.entries(config).map(([key, value]) => this.parent ? new ModuleProfile(value, base, key, this) : value.resolveParent(this));
        const customTags = this.config.customTags;
        customTags && (this.customTagSet = new Set(customTags));
        return Promise.all(this.children.map(child => child.resolve()).filter((promise, index) => {
            const prefetch = this.children[index].config.prefetch;
            return !prefetch || new RegExp(prefetch).test(location.hash);
        }));
    }
    resolveRemoteType (content, type, url) {
        this.base = url;
        if (this.type) { return; }
        if (mimeType.script.some(scriptType => type.includes(scriptType))) {
            this.type = resolvedType.script;
        } else if (type.includes(mimeType.style)) {
            this.type = resolvedType.style;
        } else if (type.includes(mimeType.html)) {
            content = content.trim();
            this.type = (content.startsWith('<html>') || content.startsWith('<!DOCTYPE ')) ? resolvedType.namespace : resolvedType.template;
        } else if (type.includes(mimeType.json)) {
            this.type = resolvedType.json;
        } else {
            this.type = resolvedType.string;
        }
    }
    resolveParent (parent) {
        const name = this.name;
        parent.module[name] = this.module;
        this.parent = parent;
        return this;
    }
    resolveState (state) {
        this.state = state;
    }
    resolveURI (uri = '') {
        uri = uri.trim();
        if (!uri) { return; }
        if (pathRegExp.test(uri)) {
            return this.parent.fetch(uri, this).then(moduleProfile => (this.type || (this.type = moduleProfile.type)) && (!is(this.type, resolvedType.namespace) || this.resolveModule(moduleProfile.resolvedContent)) && this.resolved(moduleProfile.module));
        } else {
            let pipeline = null;
            if (remoteUrlRegExp.test(uri)) {
                const cachedProfile = integrityProfileCache[this.integrity];
                if (cachedProfile) {
                    pipeline = [cachedProfile.resolve(), () => (this.type = cachedProfile.type) && cachedProfile.resolvedContent];
                } else {
                    daggerOptions.integrity && this.integrity && (integrityProfileCache[this.integrity] = this);
                    const base = new URL(uri, this.base).href;
                    pipeline = [(data, token) => serializer([remoteResourceResolver(base, this.integrity), result => result ? result : (token.stop = true)]), ({ content, type }) => this.resolveRemoteType(content, type, base) || this.resolveContent(content)];
                }
            } else {
                const element = querySelector(this.baseElement, uri), cachedProfile = elementProfileCache.get(element);
                if (cachedProfile) {
                    pipeline = [cachedProfile.resolve(), moduleProfile => (this.type = moduleProfile.type) && moduleProfile.resolvedContent];
                } else {
                    elementProfileCache.set(element, this);
                    pipeline = [this.resolveEmbeddedType(element) || this.resolveContent(element.innerHTML)];
                }
            }
            return serializer([...pipeline, resolvedContent => this.resolveModule(resolvedContent), module => this.resolved(module)]);
        }
    }
}) => {
    styleResolver('[dg-cloak] { display: none !important; }', 'dg-global-style');
    ModuleProfile.resolvedType = resolvedType;
    ModuleProfile.normalizeConfig = configNormalizer;
    return ModuleProfile;
})(), NodeContext = ((dataUpdater = {
    checked: node => is(node.tagName, 'OPTION') ? node.selected : node.checked,
    file: node => (node.multiple ? node.files : node.files[0]) || null,
    selected: (node, { scope }) => {
        const { name, type, tagName } = node, isSelect = is(tagName, 'SELECT'), data = [...(isSelect ? node.selectedOptions : querySelector(scope ? querySelector(document, scope) : document.body, `input[type="${ type }"][name="${ name }"]:checked`, true))].map(node => valueResolver(node)), multiple = isSelect ? node.multiple : is(type, 'checkbox');
        return multiple ? data : data[0];
    },
    value: ({ type, value, valueAsNumber }, { number, trim }, { detail }) => {
        if (detail) { return null; }
        if (is(type, 'date') || is(type, 'datetime-local')) {
            return new Date(valueAsNumber || 0);
        } else if (number) {
            return Number.parseFloat(value || 0);
        } else if (trim) {
            return value.trim();
        }
        return value;
    }
}, mouseEventDecoratorMapper = { 1: 'Left', 2: 'Right', 4: 'Middle', 8: 'Back', 16: 'Forward' }, eventHandlerResolver = (event, processor, decorators) => {
    const { current, modifier, prevent, stop, stopImmediate } = decorators;
    prevent && event.preventDefault();
    stop && event.stopPropagation();
    stopImmediate && event.stopImmediatePropagation();
    if ((current && !is(event.target, event.currentTarget)) || (modifier && event.getModifierState && (Array.isArray(modifier) ? modifier : [modifier]).some(modifier => !event.getModifierState(modifier)))) { return; }
    const isKeyboardEvent = isInstanceOf(event, KeyboardEvent);
    if (isKeyboardEvent || isInstanceOf(event, MouseEvent)) {
        const { code, key } = decorators;
        if (isKeyboardEvent && code && !(Array.isArray(code) ? code : [code]).every(expression => new RegExp(expression).test(event.code))) { return; }
        if (key) {
            const eventKey = isKeyboardEvent ? event.key : mouseEventDecoratorMapper[event.buttons];
            if (eventKey && !(Array.isArray(key) ? key : [key]).every(expression => new RegExp(expression).test(eventKey))) { return; }
        }
    }
    const stashedContext = { ...runtimeContext };
    runtimeContextResolver({ sensitive: decorators.sensitive || false });
    processor(event);
    runtimeContextResolver(stashedContext);
}, NodeContext = class {
    constructor (profile, closures = {}, parent = null, index = -1, sliceScope = null, scopes = parent ? parent.scopes : [rootScope, htmlScope], parentNode = null) {
        this.profile = profile;
        this.scopes = scopes;
        if (parent) {
            this.parent = parent, this.parentNode = parentNode || parent.node || parent.parentNode;
            parent.children[index] = this;
        } else {
            this.parentNode = profile.node.parentNode || profile.landmark.parentNode;
        }
        const { node, plain, moduleScope, raw, text, unique } = profile;
        if (is(node.tagName, 'HTML')) {
            this.closures = closures;
            return this.create();
        } else if (raw) { // comment/raw/script/style/template
            return this.resolveNode(unique ? node : node.cloneNode(true));
        } else if (plain) {
            moduleScope ? this.resolveClosures(moduleScope, closures) : (this.closures = closures);
            return this.resolveNode(unique ? node : node.cloneNode(false), () => this.resolveChildren());
        } else if (text) {
            this.closures = closures, this.controller = new Controller(this, closures);
            return this.resolveNode(unique ? node : document.createTextNode(''), () => this.controller.trigger());
        }
        if (sliceScope) {
            this.index = index, this.sliceScope = sliceScope, this.resolvedSliceScope = Topology.resolveScope(sliceScope);
            this.resolveClosures(this.resolvedSliceScope, closures);
        } else {
            moduleScope ? this.resolveClosures(moduleScope, closures) : (this.closures = closures);
            const each = this.closures.each;
            if (each) {
                this.children = [];
                this.resolveLandmark();
                this.controller = new Controller(this, each);
                this.controller.trigger();
                return this;
            }
        }
        this.baseClosures = this.closures;
        const exist = this.closures.exist;
        if (exist) {
            this.resolveLandmark();
            this.existController = new Controller(this, exist);
            this.existController.trigger();
        } else {
            this.create();
        }
    }
    destructor () {
        const { plain, raw } = this.profile;
        if (raw) {
            this.node.remove();
        } else {
            this.destroy();
            if (!plain) {
                this.landmark && this.landmark.remove();
                this.upperBoundary && this.upperBoundary.remove();
                this.existController && this.existController.destructor();
            }
        }
        destructor(this);
    }
    create () {
        let pipeline = [() => this.initialize()];
        const loading = this.closures.loading;
        loading && (pipeline = [loading.processor(), data => this.postLoad(data), ...pipeline]);
        serializer(pipeline);
    }
    destroy () {
        const node = this.node, { unloading, unloaded } = this.closures.directives || {};
        this.sentry && sentrySet.delete(this.sentry);
        Reflect.deleteProperty(this, 'sentry');
        unloading && unloading.processor(node);
        this.removeChildren();
        if (!this.profile.plain) {
            this.controller && (this.controller.destructor() || Reflect.deleteProperty(this, 'controller'));
            this.childrenController && (this.childrenController.destructor() || Reflect.deleteProperty(this, 'childrenController'));
            forEach(this.controllers, controller => controller.destructor()) || Reflect.deleteProperty(this, 'controllers');
            forEach(this.eventHandlers, ({ target, parameters }) => target.removeEventListener(...parameters)) || Reflect.deleteProperty(this, 'eventHandlers');
        }
        node && (this.landmark ? node.replaceWith(this.landmark) : node.remove());
        delete this.node;
        unloaded && unloaded.processor(node);
        this.baseClosures && (this.closures = this.baseClosures);
    }
    initialize () {
        if (!this.profile) { return; }
        const { node, unique, virtual } = this.profile, { child, loaded, sentry } = this.closures.directives || {};
        if (sentry) {
            this.sentry = { ...sentry };
            sentrySet.add(this.sentry);
        }
        if (is(node.tagName, 'HTML')) {
            htmlScope = this.scopes[2] || Topology.resolveScope({});
            rootNodeContexts = rootNodeProfiles.map(nodeProfile => new NodeContext(nodeProfile, functionResolver(closureResolver(nodeProfile.closures, 2))(rootScope, htmlScope)));
            loaded && loaded.processor();
        } else {
            child && (this.childrenController = new Controller(this, child));
            this.resolveNode(!virtual && (unique ? node : node.cloneNode(false)), () => this.resolveChildren() || this.resolveControllers());
            loaded && loaded.processor(this.node);
        }
    }
    postLoad (data) {
        let resolvedData = emptyObject;
        data && (is(data.constructor, Object) || (!data.constructor && is(typeof data, 'object'))) && (resolvedData = data);
        this.closures && this.resolveClosures(Topology.resolveScope(resolvedData), this.closures.postLoad || this.closures);
    }
    removeChildren () {
        if ((this.children || []).length) {
            forEach(this.children, child => child && child.destructor());
            this.children.length = 0;
        }
        if (this.node) {
            this.node.innerHTML = '';
        } else if (this.upperBoundary) {
            let node = this.upperBoundary.nextSibling;
            while (node && !is(node, this.landmark)) {
                const nextSibling = node.nextSibling;
                node.remove();
                node = nextSibling;
            }
        }
    }
    resolveChildren () {
        const children = this.profile.children;
        !this.children && (children || is((this.childrenController || {}).name, 'html')) && (this.children = []);
        this.childrenController ? this.childrenController.trigger() : forEach(children, (child, index) => new NodeContext(child, (this.closures.children || [])[index], this, index));
    }
    resolveClosures (scope, closures) {
        this.closures = closures(scope);
        this.scopes = [...this.scopes, scope];
    }
    resolveControllers () {
        const { controllers = [], eventHandlers = [] } = this.closures.directives || {};
        this.controllers = controllers.map(controller => new Controller(this, controller).trigger());
        this.eventHandlers = eventHandlers.map(eventHandler => this.resolveEventHandler(eventHandler));
    }
    resolveEventHandler ({ event, decorators = {}, processor, name, options = !!name }) {
        const target = decorators.target || this.node;
        const parameters = [event, name ? event => this.update(event, name, processor, decorators) : event => eventHandlerResolver(event, processor, decorators), options];
        target.addEventListener(...parameters);
        return { target, parameters };
    }
    resolveLandmark () {
        if (this.landmark) { return; }
        const { index, parent, parentNode, profile } = this;
        let baseLandmark = null;
        if (is(index, 0)) {
            baseLandmark = parent.upperBoundary.nextSibling;
        } else if (parentNode.contains(profile.landmark || null)) {
            baseLandmark = profile.landmark;
        } else {
            baseLandmark = parent && (parent.node ? null : parent.landmark);
        }
        this.landmark = parentNode.insertBefore(document.createTextNode(''), baseLandmark);
        (profile.each || profile.virtual) && (this.upperBoundary = parentNode.insertBefore(document.createTextNode(''), this.landmark));
    }
    resolveNode (node, callback = null) {
        this.resolveLandmark();
        if (node) {
            this.node = node;
            node[meta] = this;
            callback && callback();
            node.isConnected || this.parentNode.insertBefore(node, this.landmark);
            node.removeAttribute && node.removeAttribute('dg-cloak');
        } else if (callback) {
            callback();
        }
    }
    update (event, name, processor, decorators) {
        const stashedContext = { ...runtimeContext };
        runtimeContextResolver();
        processor(dataUpdater[name](this.node, decorators, event));
        runtimeContextResolver(stashedContext);
    }
}) => runtimeContextResolver() && NodeContext)(), NodeProfile = ((directiveType = { '$': 'controller', '+': 'event' }, interactiveDirectiveNames = hashTableResolver('checked', 'file', 'selected', 'value'), lifeCycleDirectiveNames = hashTableResolver('loaded', 'sentry', 'unloading', 'unloaded'), rawElementNames = hashTableResolver('STYLE', 'SCRIPT'), blockResolver = content => `{ ${ content } }`, caseResolver = content => content.trim().replace(/-[a-z]/g, string => string[1].toUpperCase()).replace(/-[A-Z]/g, string => `-${ string[1].toLowerCase() }`), decoratorResolver = (decorator, resolvedDecorators) => {
    const [name, value = true] = decorator.split(':').map(content => decodeURIComponent(caseResolver(content)));
    resolvedDecorators[name] = safeDataResolver(value);
    return `${ name }: ${ isString(resolvedDecorators[name]) && !is(name, 'target') ? `\`${ value }\`` : value }`;
}, directiveResolver = (expression, fields = emptyObject, signature = '()') => `{ processor: ${ signature } => { return ${ expression.trim() }; }, ${ Object.entries(fields).map(([key, value]) => `${ key }: ${ value }`).join(', ') } }`, NodeProfile = class {
    constructor (node, namespace = null, rootNodeProfiles = null, parent = null, unique = false) {
        !parent && !rootNodeProfiles && (this.root = true);
        this.node = node;
        unique && (this.unique = unique);
        const type = node.nodeType;
        this.promises = [];
        if (is(type, Node.TEXT_NODE)) {
            const resolvedTextContent = node.textContent.trim();
            if (!resolvedTextContent) { return; }
            if (resolvedTextContent.includes('${') && resolvedTextContent.includes('}')) {
                this.text = true;
                rootNodeProfiles && (this.root = true) && rootNodeProfiles.push(this) && (rootNodeProfiles = null);
                this.closures = directiveResolver(`\`${ resolvedTextContent }\``, { name: quoteResolver('text') });
                this.resolveLandmark(node);
            } else {
                this.raw = true;
            }
        } else if (is(type, Node.ELEMENT_NODE)) {
            const cloak = 'dg-cloak', { attributes, nodeName: name } = node, rawDirective = '@raw', raw = attributes[rawDirective];
            if (raw || rawElementNames[name]) {
                this.raw = true;
                rootNodeProfiles && node.removeAttribute(cloak);
                raw && node.removeAttribute(rawDirective);
            } else {
                this.directives = { controllers: [], eventHandlers: [] };
                const directiveNameSet = new Set(), resolvedTagName = caseResolver(name.toLowerCase()), isVirtualElement = !(namespace && namespace.customTagSet && namespace.customTagSet.has(resolvedTagName)) && (isInstanceOf(node, HTMLUnknownElement) || /[A-Z-]/g.test(resolvedTagName));
                (isVirtualElement || is(node.tagName, 'TEMPLATE')) && (this.virtual = true);
                forEach([...attributes], ({ name, value }) => this.resolveDirective(node, namespace, name, value, directiveNameSet));
                if (this.virtual) {
                    this.resolveLandmark(node);
                } else if (directiveNameSet.has('style')) {
                    const style = node.style, styleKeys = [...style];
                    if (styleKeys.length) {
                        this.inlineStyle = node.getAttribute('style');
                        this.styles = emptier();
                        forEach(styleKeys, key => {
                            const value = style[key], priority = style.getPropertyPriority(key);
                            this.styles[key] = priority ? `${ value } !${ priority }` : value;
                        });
                    }
                }
                if (this.landmark || this.loading || !is(Object.keys(this.directives).length, 2) || this.directives.controllers.length || this.directives.eventHandlers.length) {
                    rootNodeProfiles && (this.root = true) && rootNodeProfiles.push(this) && (rootNodeProfiles = null);
                } else {
                    this.plain = true;
                    rootNodeProfiles && node.hasAttribute(cloak) && (forEach(node.children, child => child.setAttribute(cloak, '')) || node.removeAttribute(cloak));
                }
                if (isVirtualElement) {
                    this.promises.push(namespace.fetch(resolvedTagName).then(moduleProfile => this.resolveTemplate(moduleProfile)));
                } else if (!this.directives.child && !is(node.tagName, 'HTML')) {
                    this.resolveChildren(node, namespace, rootNodeProfiles);
                }
            }
        } else if (is(type, Node.DOCUMENT_FRAGMENT_NODE)) {
            this.resolveChildren(node, namespace, rootNodeProfiles);
        } else if (is(type, Node.COMMENT_NODE)) {
            if (daggerOptions.commentNode) {
                this.raw = true;
            } else {
                return this.resolveLandmark(node);
            }
        }
        parent && parent.children.push(this);
        if (this.promises.length) {
            const promise = Promise.all(this.promises).then(() => {
                this.root && this.resolveClosures();
                return '';
            });
            parent && parent.promises.push(promise);
        } else {
            this.root && this.resolveClosures();
            delete this.promises;
        }
    }
    resolveChildren (node, namespace, rootNodeProfiles) {
        const childNodes = this.virtual ? node.content.childNodes : node.childNodes;
        if (childNodes.length) {
            this.children = [];
            forEach(childNodes, childNode => new NodeProfile(childNode, namespace, rootNodeProfiles, this, !!this.unique));
            this.plain && this.children.every(child => child.raw) && (this.raw = true) && Reflect.deleteProperty(this, 'plain');
        }
        return this;
    }
    resolveClosures (moduleScope = null) {
        if (!this.closures) {
            let closures = '';
            if (!this.raw) {
                const comma = ', ', ownClosures = this.plain ? '' : Object.entries(this.directives || {}).map(([key, value]) => `${ key }: ${ Array.isArray(value) ? `[${ value.join(comma) }]` : value }`).join(comma);
                closures = `${ ownClosures ? `directives: ${ blockResolver(ownClosures) }, ` : '' }${ this.children ? `children: [${ this.children.map(child => child.resolveClosures(this.innerModuleScope)).join(comma) }]` : '' }`;
                if (this.loading) {
                    const postLoadClosure = closures ? closureResolver(blockResolver(closures)) : '';
                    closures = `loading: ${ this.loading }, ${ postLoadClosure && `postLoad: ${ postLoadClosure }` }`;
                }
                this.exist && (closures = `exist: ${ this.exist }, ${ closures }`);
                this.each && (closures = `each: ${ this.each }, ${ closures ? `slice: ${ closureResolver(blockResolver(closures)) }` : '' }`);
                if (closures) {
                    closures = blockResolver(closures);
                    moduleScope && (closures = closureResolver(closures)) && (this.moduleScope = moduleScope);
                } else {
                    (this.raw = true) && Reflect.deleteProperty(this, 'plain');
                }
                this.root && (this.closures = closures);
            }
            return closures;
        }
        return this.closures;
    }
    resolveDirective (node, namespace, attributeName, value, directiveNameSet) {
        const resolvedType = directiveType[attributeName[0]];
        if (!resolvedType) { return; }
        this.virtual || node.removeAttribute(attributeName);
        const fields = emptier(), [name, ...rawDecorators] = attributeName.substr(1).split('#'), resolvedDecorators = emptier(), decorators = rawDecorators.filter(decorator => decorator).map(decorator => decoratorResolver(decorator, resolvedDecorators)).join(', ');
        decorators && (fields.decorators = blockResolver(decorators));
        if (is(resolvedType, 'event')) {
            fields.event = quoteResolver(name);
            const { capture, once, passive } = resolvedDecorators;
            (capture || once || passive) && (fields.options = `{ capture: ${ capture || false }, once: ${ once || false }, passive: ${ passive || false } }`);
            this.directives.eventHandlers.push(directiveResolver(value, fields, isString(resolvedDecorators.event) ? resolvedDecorators.event : '$event'));
        } else if (is(name, 'loading')) {
            this.loading = directiveResolver(value, fields);
        } else if (lifeCycleDirectiveNames[name]) {
            const isSentry = is(name, 'sentry');
            const decoratorName = isSentry ? 'next' : 'node';
            const defaultParameterName = isSentry ? '$nextRouter' : '$node';
            this.directives[name] = directiveResolver(value, fields, isString(resolvedDecorators[decoratorName]) ? resolvedDecorators[decoratorName] : defaultParameterName);
        } else {
            is(name, 'watch') || (fields.name = quoteResolver(name));
            const directive = directiveResolver(value, fields);
            if (is(name, 'each')) {
                this.each = directive;
                this.resolveLandmark(node);
                delete this.unique;
            } else if (is(name, 'exist')) {
                this.exist = directive;
                this.resolveLandmark(node);
            } else if (is(name, 'html') || is(name, 'text')) {
                this.namespace = namespace;
                this.directives.child = directive;
            } else {
                this.directives.controllers.push(directive);
                if (is(name, 'class')) {
                    node.classList.length && (this.classNames = [...node.classList].map(className => className.trim()));
                } else if (interactiveDirectiveNames[name]) { // two-way data binding
                    const { tagName, type } = node, isCheckedDirective = is(name, 'checked'), isValueDirective = is(name, 'value'), isSelectedDirective = is(name, 'selected'), isCheckedType = is(type, 'checkbox') || is(type, 'radio'), isFileType = is(type, 'file');
                    if ((is(tagName, 'INPUT') && ((isFileType && is(name, 'file')) || (isCheckedType && (isCheckedDirective || isSelectedDirective)) || (!isCheckedType && !isFileType && isValueDirective))) || ((is(tagName, 'OPTION') && isCheckedDirective) || (is(tagName, 'SELECT') && isSelectedDirective) || (is(tagName, 'TEXTAREA') && isValueDirective))) {
                        fields.event = quoteResolver(resolvedDecorators.input ? 'input' : 'change');
                        this.directives.eventHandlers.push(directiveResolver(`(() => { try { Object.is(${ value }, $$_dg_data) || (${ value } = $$_dg_data); } catch (error) {} })()`, fields, '$$_dg_data'));
                    }
                } else {
                    directiveNameSet.add(name);
                }
            }
        }
    }
    resolveLandmark (node) {
        if (this.landmark) { return; }
        this.landmark = document.createTextNode('');
        this.promises.push(Promise.resolve().then(() => node.replaceWith(this.landmark)));
    }
    resolveTemplate (moduleProfile) {
        const module = moduleProfile.module;
        let cachedFields = templateCache.get(module);
        if (!cachedFields) {
            cachedFields = emptier();
            const isTemplate = isInstanceOf(module, NodeProfile), template = isTemplate ? module : (module || {}).template;
            cachedFields.namespace = isTemplate ? moduleProfile.parent : moduleProfile;
            cachedFields.children = template.children;
            forEach(cachedFields.children, child => child.namespace && (child.namespace = cachedFields.namespace));
            templateCache.set(module, cachedFields);
            isTemplate || templateCache.set(template, cachedFields);
        }
        Object.assign(this, cachedFields);
        this.namespace.resolve().then(namespace => (this.innerModuleScope = namespace.extract()[this.namespace.name]));
        return '';
    }
    updateNamespace (moduleProfile) {
        this.namespace && (this.namespace = moduleProfile);
        forEach(this.children, nodeProfile => nodeProfile.updateNamespace(moduleProfile));
    }
}) => NodeProfile)(), Topology = ((dispatchSource = { bubble: 'bubble', self: 'self', mutation: 'mutation' }, ignoreSubscribe = false, ignoreUpdate = false, proxyConstructorSet = new Set([Array, Object]), proxyHandler = {
    get: (target, property) => {
        const controller = runtimeContext.controller, value = Reflect.get(target, property), prototype = Reflect.getPrototypeOf(target);
        if (ignoreSubscribe || !controller || reservedProperties.has(property) || (prototype && Reflect.has(prototype, property)) || isInstanceOf(value, Function)) { return value; }
        const targetTopology = target[meta];
        if (!prototype) {
            targetTopology[property].subscribe();
        } else if (targetTopology.has(runtimeContext.topology)) {
            const topology = runtimeContext.topology.fetch(property);
            isInstanceOf(topology, Topology) && topology.subscribe();
        } else {
            targetTopology.forEach(topology => topology.fetch(property).subscribe());
        }
        return value;
    },
    set: (target, property, newValue) => {
        if (ignoreUpdate || reservedProperties.has(property)) { return Reflect.set(target, property, newValue); }
        const contextTopology = runtimeContext.topology, targetTopology = target[meta];
        isInstanceOf(targetTopology, Set) && targetTopology.has(contextTopology) && contextTopology.unsubscribe();
        if (!is(Reflect.get(target, property), newValue)) {
            newValue = proxyResolver(newValue, target[meta], property);
            Reflect.set(target, property, newValue);
            topologyUpdater(targetTopology, property, newValue);
        }
        return true;
    },
    deleteProperty: (target, property) => {
        const exist = Reflect.has(target, property);
        if (Reflect.deleteProperty(target, property)) {
            exist && topologyUpdater(target[meta], property);
            return true;
        }
        return false;
    }
}, reservedProperties = new Set([meta, Symbol.asyncIterator, Symbol.hasInstance, Symbol.isConcatSpreadable, Symbol.iterator, Symbol.match, Symbol.matchAll, Symbol.replace, Symbol.search, Symbol.species, Symbol.split, Symbol.toPrimitive, Symbol.toStringTag, Symbol.unscopables]), dispatchResolver = (controller, force) => {
    if (runtimeContext.sensitive) {
        controller.trigger(force);
    } else if (!queueingControllerSet.has(controller)) {
        queueingControllerSet.add(controller);
        queueMicrotask(() => controller.trigger(force));
    }
}, fetcher = (parent = null, name = '') => parent ? parent.fetch(name) : new Topology(), proxyResolver = (rawData, parentTopology = null, property = '') => {
    const topologies = isInstanceOf(parentTopology, Set) || Array.isArray(parentTopology) ? [...parentTopology].map(topology => fetcher(topology, property)) : [fetcher(parentTopology, property)];
    if (!isInstanceOf(rawData) || isInstanceOf(rawData, HTMLElement)) {
        ignoreUpdate && forEach(topologies, topology => (topology[meta].value = rawData));
    } else if (rawData[meta]) {
        forEach(topologies, topology => rawData[meta].add(topology));
    } else {
        const constructor = rawData.constructor;
        if (proxyConstructorSet.has(constructor)) {
            const resolvedData = new Proxy(parentTopology ? new constructor() : emptier(), proxyHandler);
            if (parentTopology) {
                resolvedData[meta] = new Set(topologies);
                ignoreUpdate && forEach(topologies, topology => (topology[meta].value = resolvedData));
            } else {
                const topology = topologies[0];
                resolvedData[meta] = topology;
                topology[meta].value = resolvedData;
            }
            forEach(ownKeys(rawData), key => (resolvedData[key] = proxyResolver(rawData[key], topologies, key)));
            parentTopology || Object.seal(resolvedData);
            return resolvedData;
        } else {
            rawData[meta] = new Set(topologies);
        }
    }
    return rawData;
}, topologyUpdater = (topology, property, newValue) => {
    if (isInstanceOf(topology, Set)) { return topology.forEach(topology => topologyUpdater(topology, property, newValue)); }
    property && (topology = topology.fetch(property));
    topology.update(newValue, dispatchSource.self);
}, Topology = class {
    constructor (parent = null, name = '') {
        if (parent) {
            parent[name] = this;
            const parentPath = parent[meta].path;
            this[meta] = { parent, path: parentPath ? `${ parentPath }.${ name }` : name };
        } else {
            this[meta] = { path: name };
        }
    }
    destructor () {
        forEach(Object.keys(this), key => this[key].destructor());
        const metaInfo = this[meta];
        delete metaInfo.parent;
        if (metaInfo.controllerSet) {
            metaInfo.controllerSet.clear();
            delete metaInfo.controllerSet;
        }
        destructor(this);
    }
    dispatch (source = dispatchSource.bubble) {
        const { controllerSet, parent } = this[meta];
        if (controllerSet) {
            const force = is(source, dispatchSource.bubble);
            controllerSet.forEach(controller => dispatchResolver(controller, force));
        }
        !is(source, dispatchSource.mutation) && parent && parent[meta].parent && parent.dispatch();
    }
    fetch (name) { return this[name] || new Topology(this, name); }
    subscribe () {
        runtimeContext.topology = this;
        const controller = runtimeContext.controller, { topologySet, visitedTopologySet } = controller;
        if (visitedTopologySet.has(this)) { return; }
        const metaInfo = this[meta], { controllerSet, parent } = metaInfo;
        parent && parent[meta].parent && parent.unsubscribe(controller);
        topologySet.add(this);
        visitedTopologySet.add(this);
        controllerSet ? controllerSet.add(controller) : (metaInfo.controllerSet = new Set([controller]));
    }
    unsubscribe (controller = runtimeContext.controller) {
        controller.topologySet.delete(this);
        const controllerSet = this[meta].controllerSet;
        controllerSet && controllerSet.delete(controller);
    }
    update (newValue, source = dispatchSource.mutation) {
        const metaInfo = this[meta], oldValue = metaInfo.value;
        if (is(oldValue, newValue)) { return; }
        (!Reflect.has(metaInfo, 'oldValue') || runtimeContext.sensitive) && (metaInfo.oldValue = oldValue);
        metaInfo.value = newValue;
        isInstanceOf(oldValue) && !isInstanceOf(oldValue, HTMLElement) && oldValue[meta] && oldValue[meta].delete(this) && forEach(ownKeys(oldValue), key => this[key] && this[key].update((newValue || emptyObject)[key]));
        isInstanceOf(newValue) && !isInstanceOf(newValue, HTMLElement) && newValue[meta] && newValue[meta].add(this) && forEach(ownKeys(newValue), key => fetcher(this, key).update((newValue || emptyObject)[key]));
        this.dispatch(source);
    }
}) => {
    Topology.resolveScope = rawData => {
        ignoreUpdate = true;
        const resolvedData = proxyResolver(rawData);
        ignoreUpdate = false;
        return resolvedData;
    };
    const originalMethod = JSON.stringify;
    JSON.stringify = (...parameters) => {
        ignoreSubscribe = true;
        const string = originalMethod(...parameters);
        ignoreSubscribe = false;
        return string;
    };
    return Topology;
})(), runtime = ((base = '', customTags = null, currentStyles = [], htmlNodeContext = null, htmlNodeProfile = null, ignoreHashChange = false, nextRouter = null, rootNodes = null, routers = null, resolvedRouters = null, rootRouter = null, routerOptions = { aliases: {}, default: '', hashPrefix: '#', overrideRelativeLinks: true, redirects: {}, scenarios: {} }, relativeLinkResolver = ((tagNames = hashTableResolver('A', 'AREA')) => event => {
    const node = event.target;
    if (!tagNames[node.tagName] || !node.hasAttribute('href')) { return; }
    const href = node.getAttribute('href').trim(), hashPrefix = routerOptions.hashPrefix;
    href && ![hashPrefix, '.', '/'].some(prefix => href.startsWith(prefix)) && !is(href, new URL(href, document.baseURI).href) && (node.href = `${ hashPrefix }${ href }`);
})(), hashChangeResolver = ((routerChangeResolver = ((reservedFieldNames = hashTableResolver('$modules', '$router', '$validator'), rootModuleProfileResolver = (rootModuleProfile, nextRouter) => {
    forEach(Object.keys(rootScope).filter(key => !reservedFieldNames[key]), key => Reflect.deleteProperty(rootScope, key));
    const styleModuleSet = new Set(), modules = rootModuleProfile.extract(styleModuleSet)[rootModuleProfile.name];
    Object.assign(rootScope, modules);
    rootScope.$modules = modules;
    htmlNodeContext ? forEach(ownKeys(rootScope.$router), key => (rootScope.$router[key] = nextRouter[key])) : (rootScope.$router = nextRouter);
    forEach(currentStyles, style => styleModuleSet.has(style) || ((style.disabled = true)));
    currentStyles = [...styleModuleSet];
    forEach(currentStyles, style => (style.disabled = false));
    if (htmlNodeContext) {
        forEach(rootNodeProfiles, nodeProfile => nodeProfile.updateNamespace(rootModuleProfile));
        const loaded = (htmlNodeContext.closures.directives || {}).loaded;
        loaded && loaded.processor();
    } else {
        htmlNodeContext = new NodeContext(htmlNodeProfile, functionResolver(closureResolver(htmlNodeProfile.closures, 2))(rootScope, htmlScope));
    }
}) => () => {
    templateCache.clear();
    const rootModules = Object.assign({}, ...resolvedRouters.map(router => router.modules));
    forEach(Object.keys(rootModules), key => isInstanceOf(rootModules[key], ModuleProfile) || (rootModules[key] = routers.find(router => router.resolveModule(key, base)).modules[key]));
    const rootModuleProfile = new ModuleProfile({ content: rootModules, customTags, type: ModuleProfile.resolvedType.namespace }, base), resolver = rootModuleProfile.resolve().then(() => rootModuleProfileResolver(rootModuleProfile, Topology.resolveScope(nextRouter)));
    if (htmlNodeContext) {
        const { unloading, unloaded } = htmlNodeContext.closures.directives || {};
        unloading && unloading.processor();
        unloaded && unloaded.processor();
    } else {
        forEach(rootNodes, rootNode => Reflect.construct(NodeProfile, [rootNode, rootModuleProfile, rootNodeProfiles, null, true]));
    }
    return resolver;
})(), inspectResolver = ((resolver = (array, token) => {
    const index = array.findIndex(rejected => rejected);
    if (index < 0) { return; }
    token.stop = true;
    ignoreHashChange = true;
    location.hash = `${ rootScope.$router.hashPrefix }${ rootScope.$router.path }`;
}) => token => Promise.all([...sentrySet].map(sentry => sentry.processor(nextRouter))).then(array => resolver(array, token)))()) => (hash = location.hash.replace(routerOptions.hashPrefix, '')) => {
    if (ignoreHashChange) {
        ignoreHashChange = false;
        return;
    }
    const slash = '/';
    hash.startsWith(slash) || (hash = `${ slash }${ hash }`);
    const { aliases, hashPrefix, redirects } = routerOptions, [path = '', query = ''] = hash.split('?'), redirectPath = aliases[path] || redirects[path];
    if (redirectPath) {
        hash = query ? `${ redirectPath }?${ query }` : redirectPath;
        aliases[path] || history.replaceState({ path: hash }, hash, `${ hashPrefix }${ hash }`);
        return hashChangeResolver(hash);
    }
    const scenarios = {}, paths = is(path, slash) ? [''] : path.split(slash);
    routers = [];
    if (!rootRouter.match(routers, scenarios, paths)) { return hashChangeResolver(routerOptions.default); }
    resolvedRouters = routers.slice().reverse();
    forEach(resolvedRouters, router => router.initialize());
    const queries = {};
    query && forEach([...new URLSearchParams(query)], ([key, value]) => (queries[key] = safeDataResolver(value)));
    const schemes = Object.assign({}, ...resolvedRouters.map(router => router.variables), queries, ...resolvedRouters.map(router => router.constants));
    nextRouter = Object.freeze({ hash, hashPrefix, path, paths, query, queries, scenarios, schemes, identity: Symbol('identity') });
    const token = {};
    serializer([htmlNodeContext && inspectResolver(token), () => routerChangeResolver()], token);
})(), resetEventHandler = ((resetFlag = { detail: true }, changeEvent = new CustomEvent('change', resetFlag), inputEvent = new CustomEvent('input', resetFlag)) => event => is(event.target.tagName, 'FORM') && forEach(document.querySelectorAll('input, textarea'), child => {
    child.dispatchEvent(inputEvent);
    child.dispatchEvent(changeEvent);
}))(), Router = class {
    constructor ({ children, path = '', constants = {}, variables = {}, modules = null, tailable = !children }, parent = null) {
        this.constants = constants, this.variables = variables, this.modules = modules, this.tailable = tailable;
        this.scenarios = isInstanceOf(path) ? Object.entries(path).map(([scenario, regExp]) => ({ scenario, regExp: new RegExp(regExp || '^$') })) : [{ scenario: path, regExp: new RegExp(`^${ path }$` || '^$') }];
        if (parent) {
            this.parent = parent;
            parent.children.push(this);
        }
        if (children) {
            this.children = [];
            forEach(children, child => new Router(child, this));
        }
    }
    initialize () {
        if (this.initialized) { return; }
        this.initialized = true;
        this.modules && (this.modules = ModuleProfile.normalizeConfig(this.modules));
    }
    match (routers, scenarios, paths, length = paths.length, start = 0) {
        const scenarioLength = this.scenarios.length;
        if ((length >= scenarioLength) && this.scenarios.every(({ scenario, regExp }, index) => {
            const path = paths[start + index];
            if (regExp.test(path)) {
                scenarios[scenario] = path;
                return true;
            }
        })) {
            start += scenarioLength;
            if ((is(length, start) && this.tailable) || (this.children || []).find(child => child.match(routers, scenarios, paths, length, start))) {
                routers.push(this);
                return true;
            }
        }
    }
    resolveModule (key, base) {
        if (this.modules) {
            const module = this.modules[key];
            this.modules[key] = module && (isInstanceOf(module, ModuleProfile) ? module : new ModuleProfile(module, base, key));
            return this.modules[key];
        }
    }
}, runtime = (configs = {}) => {
    const { options = {}, rootSelectors = ['title', 'body'], routing = {} } = configs;
    Object.assign(daggerOptions, options);
    Object.assign(routerOptions, routing);
    const { overrideRelativeLinks, scenarios } = routerOptions;
    overrideRelativeLinks && document.body.addEventListener('click', relativeLinkResolver, true);
    document.body.addEventListener('reset', resetEventHandler);
    rootNodes = [...new Set(rootSelectors.map(rootSelector => [...querySelector(document, rootSelector, true)]).flat())];
    htmlNodeProfile = new NodeProfile(document.querySelector('html')), ({ base, customTags } = configs), rootRouter = new Router(scenarios);
    window.addEventListener('hashchange', () => hashChangeResolver());
    hashChangeResolver();
}, version = '1.0.0 - RC') => {
    const register = ((resolver = (prototype, name) => {
        const method = prototype[name];
        const resolvedMethod = function (...parameters) {
            const result = method.bind(this)(...parameters);
            this[meta] && this[meta].forEach(topology => topology.dispatch());
            return result;
        }
        Reflect.defineProperty(resolvedMethod, 'name', { configurable: true, value: name });
        Reflect.defineProperty(prototype, name, { get: () => resolvedMethod });
    }) => (target, names) => {
        const prototype = target.prototype;
        forEach(names, name => resolver(prototype, name));
    })();
    const mapMethodNames = ['set', 'delete'], setMethodNames = ['add', 'delete'];
    register(Date, ['setDate', 'setFullYear', 'setHours', 'setMilliseconds', 'setMinutes', 'setMonth', 'setSeconds', 'setTime', 'setUTCDate', 'setUTCFullYear', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds', 'setYear']) || register(Map, mapMethodNames) || register(Set, setMethodNames) || register(WeakMap, mapMethodNames) || register(WeakSet, setMethodNames);
    window.$dagger = Object.freeze(Object.assign(emptier(), { register, runtime, version }));
    return runtime;
})()) => head.querySelector('script[type="dagger/configs"]') ? document.addEventListener('DOMContentLoaded', () => serializer([configResolver(head), ({ base, content }) => runtime(Object.assign({ base }, content))])) : runtime)();
