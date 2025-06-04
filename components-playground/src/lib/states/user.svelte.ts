import type { CardClass, HolderClass } from "./card-and-holder.svelte";

export let holder_objects: HolderClass[] = $state([]);
export enum UserState {
    HOLDING = 4000,
    NORMAL = 4001
}

export const User = (function(){
    let current_state : UserState = $state(UserState.NORMAL);
    let holding: CardClass | undefined = $state(undefined)
    let dropCardFunction : any = $state(()=>{})
    let aHolderIsActive : boolean = $state(false);
    let cancelFunc : any = $state()

    return {
        get current_state() {
            return current_state;
        },
        set current_state(state : UserState) {
            current_state = state
        },
        HoldCard(card : CardClass) {
            holding = card
        },
        get holding() {
            return holding
        },
        DropCard() {
            holding = undefined
            dropCardFunction();
        },
        get isHoldingACard() {
            return holding != undefined
        },
        onValidDropDo(func : any) {
            dropCardFunction = func
        },
        isInsideAHolder() {
            aHolderIsActive = true;
        },
        leftAHolder() {
            aHolderIsActive = false;
        },
        get aHolderIsActive() {return aHolderIsActive},
        set cancelFunc(func : any) {
            cancelFunc = func
        },
        hasCancelled() {
            console.log("CANCELLED")
            cancelFunc()
            cancelFunc = undefined;
        }
    }
}())