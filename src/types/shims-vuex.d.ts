import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { IStore } from './store'

declare module '@vue/runtime-core' {

    interface ComponentCustomProperties {
        $store: Store<IStore>
    }
}