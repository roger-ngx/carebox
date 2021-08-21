interface IIdea {
    category: string,
    type: string,
    scamper: string,
    subject: string,
    detail: object,
    images: {},
    links: string[]
}

export interface IImage{
    url: string,
    title: string,
}

export interface ILink{
    url: string,
    title: string
}

export default class Idea {
    idea = {
        ownerId: '',
        category: '',
        type: '',
        scampers: [],
        subject: '',
        detail: {},
        images: {},
        links: [],
        imageAndLinkRequired: true,
        scamperRequired: true
    };

    constructor()
    constructor(idea?: IIdea){
        idea && (this.idea = idea);
    }

    get data(){
        return this.idea;
    }

    get ownerId(){
        return this.idea.ownerId;
    }
    setOwnerId(ownerId: string){
        this.idea.ownerId = ownerId;
    }

    get category(){
        return this.idea.category;
    }
    setCategory(category: string){
        this.idea.category = category
    }

    get type(){
        return this.idea.type;
    }
    setType(type: string){
        this.idea.type = type
    }

    get scampers(){
        return this.idea.scampers;
    }
    setScampers(scampers:string[]){
        this.idea.scampers = scampers;
    }

    get subject(){
        return this.idea.subject;
    }
    setSubject(subject:string){
        this.idea.subject = subject;
    }

    get ideaDetail(){
        return this.idea.detail;
    }
    setIdeaDetail(detail: object){
        this.idea.detail = detail;
    }

    get images(){
        return this.idea.images;
    }
    setImages(images: Image[]){
        return this.idea.images = images;
    }

    get links(){
        return this.idea.links;
    }
    setLinks(links: Link[]){
        return this.idea.links = links;
    }

    get imageAndLinkRequired(){
        return this.idea.imageAndLinkRequired;
    }
    setImageAndLinkRequired(required){
        return this.idea.imageAndLinkRequired = required;
    }

    get scamperRequired(){
        return this.idea.scamperRequired;
    }

    setScamperRequired(required){
        this.idea.scamperRequired = required;
    }
}