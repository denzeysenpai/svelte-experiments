import type { Component } from "svelte";

export enum CardState {
    LIFTED = 10001,
    DROPPED = 10002,
    STATIONED = 10003
}
export enum HolderState {
    ACTIVE = 20001,
    PASSIVE = 20002
}

export class CardClass {
    public current_state? : CardState = $state();
    public current_parent? : any = $state();
    public previous_parent? : any = $state();
    public title : string = $state('Unnnamed Card')
    public description : string = $state('')
    public id : string = $state('')
    public status : string = $state('')
    
    public constructor(_id: string,  _parent : string, _title: string, _desc : string, _status : string){
        this.current_state = CardState.STATIONED;
        this.current_parent = _parent;
        this.previous_parent = _parent;
        this.title = _title;
        this.description = _desc;
        this.status = _status;
    }
    public MoveToNewHolder(parentId : string) {
        this.previous_parent = this.current_parent
        this.current_parent = parentId
    }
}

export class HolderClass {
    public cards : CardClass[] = $state([]);
    public title : string = $state('')
    public id : string = $state('')
    public state : HolderState = $state(HolderState.PASSIVE)
    public constructor(id: string, title: string) {
        this.id = id
        this.title = title
    }
    public AddCard(card : CardClass) {
        this.cards.push(card)
    }
    public Active() {
        this.state = HolderState.ACTIVE
    }
    public Passive() {
        this.state = HolderState.PASSIVE
    }
    public get isActive() {
        return this.state === HolderState.ACTIVE
    }
}