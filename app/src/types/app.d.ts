/// <reference types="@sveltejs/kit" />

declare namespace App {
    interface Locals {
        user?: import('./index').PublicUser
    }
    // interface Locals {}
    interface PageData {
        user?: import('./index').PublicUser
    }
    // interface Platform {}
}
