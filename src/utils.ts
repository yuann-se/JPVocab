import { onMounted, onUnmounted } from "vue"

export const useDisableScroll = () => {
    onMounted(() => { document.body.style.overflowY = 'hidden' })
    onUnmounted(() => { document.body.style.overflowY = 'auto' })
}
// eslint-disable-next-line
export const shuffle = (array: any[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}