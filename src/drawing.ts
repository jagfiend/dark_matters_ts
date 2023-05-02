import Settings from "./settings";

export function clear(context: CanvasRenderingContext2D) {
    context.clearRect(0,0, Settings.SCREEN_WIDTH, Settings.SCREEN_WIDTH)
}
