<template>
    <header>
        <nav class="navbar navbar-expand fixed-top bg-white">
            <div class="container-fluid">
                <div class="navbar-nav">
                    <slot name="left"></slot>
                </div>
                <div class="navbar-nav">
                    <slot name="right"></slot>
                </div>
            </div>
        </nav>
    </header>
</template>