<template>
    <div class="ui menu">
        <div class="ui container">
            <router-link to="/" class="item">Getting Started</router-link>
            <div class="ui simple dropdown item">
                Docs <i class="dropdown icon"></i>
                <div class="menu">
                    <router-link to="/docs/stars" class="item">Stars</router-link>
                    <router-link to="/docs/hearts" class="item">Hearts</router-link>
                    <router-link to="/docs/font-awesome" class="item">Font Awesome</router-link>
                    <router-link to="/docs/images" class="item">Image Rater</router-link>
                </div>
            </div>
            <router-link to="/extending" class="item"> Extending</router-link>
        </div>
    </div>
</template>
