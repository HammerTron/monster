// mock of AppStateActions to be used in spec files
export class MockAppStateActions {
    constructor() {}

    /**
     * The app is tied up doing stuff
     */
    busy(): void {}

    /**
     * App is free to process more stuff.
     */
    idle(): void {}

    /**
     * used to enable or disable the universal page loading overlay located in AppComponent template
     * whenever we have some component level loading animation that should take precedence over
     * the global, universal loading animation, we use this method to drive that
     * @param _disable
     */
    disableBusy(_disable: boolean): void {}

    updateUsernameText(username: string): void {}
    updatePasswordText(password: string): void {}
    submitLoginInfo(username: string, password: string): void {}
    AppBusy(value: any): void {}
    AppIdle(value: any): void {}
    AppKillLoading(value: any): void {}
}
