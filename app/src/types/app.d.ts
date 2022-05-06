/// <reference types="@sveltejs/kit" />

type Session_ = import('./index').Session
declare namespace App {
    interface Locals {
        user?: import('./index').User
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Session extends Session_ {}
    // interface Platform {}
    // interface Stuff {}
}
