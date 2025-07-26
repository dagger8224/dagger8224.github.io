export const load = language_packages => {
    const language = localStorage.getItem('$language') || 'enUS';
    return {
        language,
        $: language_packages[language],
        isLoading: true
    };
};

export const sentry = ($scope, $nextRoute) => {
    const shouldBlocked = $nextRoute.path == '/blocked';
    if (shouldBlocked) {
        console.warn('redirect is blocked by sentry directive');
        return true;
    } else {
        $scope.isLoading = true;
        setTimeout(() => {
            $scope.isLoading = false;
        }, 1000);
    }
};
