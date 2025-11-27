<template>
	<div class="dashboard-layout">
		<header>
			<slot name="header"></slot>
		</header>
		<aside :class="{ 'sidebar-open': isSidebarOpen }">
			<slot name="sidebar"></slot>
		</aside>
		<main>
			<slot></slot>
		</main>
	</div>
</template>
