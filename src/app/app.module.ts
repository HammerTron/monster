import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../environments/environment';

import { APP_STORE } from './store/app-store';
import { APP_TRANSLATIONS } from './app.translations';
import { APIMockService } from './shared/services/Mock/api-mock.service';
import { AppStateActions } from './store/App/actions/app-state.actions';
import { AppStateSelectors } from './store/App/selectors/app-state.selectors';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendService } from './shared/services/Backend/backend.service';
import { FlightService } from './areas/Flights/services/Flight/flight.service';
import { LoginModule } from './areas/Login/login.module';
import { LoginService } from './areas/Login/services/Login/login.service';
import { SharedModule } from './shared/shared.module';
import { StandardHttpInterceptor } from './shared/services/Backend/standard-http-interceptor';
import { NotAuthorizedComponent } from './areas/NotAuthorized/not-authorized.component';
import { PageNotFoundComponent } from './areas/PageNotFound/page-not-found.component';

// aoT requires an exported function for factories
export const HttpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
new TranslateHttpLoader(http, './assets/i18n/', '.json');

const devToolsModule: Array<any> = environment.devToolsEnabled
? [
StoreDevtoolsModule.instrument({
    name: 'Mona-Lisa',
    maxAge: 25, // retains last 25 states
    logOnly: environment.production, // restrict extension to log-only mode
}),
]
: [];

@NgModule({
    declarations: [AppComponent, PageNotFoundComponent, NotAuthorizedComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,

        LoginModule,
        SharedModule,

        // @ngx-translate
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),

        // @ngrx/store
        StoreModule.forRoot(APP_STORE, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: false,
            },
        }),

        // @ngrx/store-devtools
        devToolsModule,
    ],
    providers: [
        APIMockService,
        AppStateActions,
        AppStateSelectors,
        BackendService,
        FlightService,
        LoginService,
        // http Interceptor
        {
            provide: HTTP_INTERCEPTORS,
            useClass: StandardHttpInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    /**
     * @description AppModule constructor
     * @param {TranslateService} translate
     */
    constructor(
        private readonly translate: TranslateService, // private readonly devTools: DevToolsExtension, // private readonly ngRedux: NgRedux<AppStore>,
    ) {
        // force ngx-translate to use english for now
        this.translate.setTranslation('en', APP_TRANSLATIONS);

        this.translate.use('en');
    }
}
