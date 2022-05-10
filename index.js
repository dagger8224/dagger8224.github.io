export const onLoading = language_packages => {
    const language = localStorage.getItem('language') || 'en-us';
    return {
        language,
        $: language_packages[language],
        isLoading: true
    };
};

export const sentry = ($scope, $nextRouter) => {
    const shouldBlocked = $nextRouter.path == '/blocked';
    if (shouldBlocked) {
        console.warn('redirect is blocked by sentry directive');
        return true;
    } else {
        $scope.isLoading = true;
    }
};
