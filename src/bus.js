import Vue from 'vue';
import apolloProvider from "@/factory/ApolloProviderFactory";

const bus = new Vue({
	apolloProvider
});

export default bus;
