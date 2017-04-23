<template>
    <div class="ui menu">
        <div class="ui container">
            <router-link to="/" class="item">Getting Started</router-link>
            <div class="ui simple dropdown item">
                Docs <i class="dropdown icon"></i>
                <div class="menu">
                    <router-link to="/docs/stars" class="item">Stars</router-link>
                    <a href="#" to="/articles/create" class="item">Hearts</a>
                    <a href="#" to="/articles/create" class="item">Font Awesome</a>
                     <router-link to="/docs/images" class="item">Image Rater</router-link>
                    <a href="#" to="/articles/create" class="item">Base Rater</a>
                    <a href="#" to="/articles/create" class="item">Mixins</a>
                </div>
            </div>
            <a href="#" class="item"> Create Your Own</a>
        </div>
    </div>
</template>
