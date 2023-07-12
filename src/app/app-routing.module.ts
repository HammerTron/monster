import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginModule } from './areas/Login/login.module';
import { NotAuthorizedComponent } from './areas/NotAuthorized/not-authorized.component';
import { PageNotFoundComponent } from './areas/PageNotFound/page-not-found.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            // {
            //     path: 'Login',
            //     component: PageNotFoundComponent,
            // },

            /**
             * default route i.e. route used when no matching route found
             */
            {
                path: '',
                redirectTo: 'Login',
                pathMatch: 'full',
            },
            {
                path: 'PageNotFound',
                component: PageNotFoundComponent,
            },
            {
                path: 'NotAuthorized',
                component: NotAuthorizedComponent,
            },
            {
                path: '**',
                redirectTo: '/PageNotFound',
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
