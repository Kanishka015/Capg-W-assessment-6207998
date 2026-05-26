import {Page,Locator} from "@playwright/test"
class Home{
    page:Page
    MbAdvicePopover:Locator;
    helpPopover:Locator;
    constructor(page:Page){
        this.page=page;
        this.MbAdvicePopover=this.page.getByText("MB Advice",{exact:true})
        this.helpPopover=this.page.getByText("Help",{exact:true});
    }
    //Home page Navigation
    async getPropWorth(){
        await this.MbAdvicePopover.hover();
        const [propWorthPage]=await Promise.all([
            this.page.waitForEvent("popup"),
        this.page.getByText("PropWorth").click()
        ])
        return propWorthPage;
    }
    async areaConversion(){
        await this.MbAdvicePopover.hover();
        const [areaConvertPage]=await Promise.all([
            this.page.waitForEvent("popup"),
            this.page.getByText("Area Converter").click()
        ])
        return areaConvertPage;
    }
    async chatWithUs(){
        await this.helpPopover.hover();
        const [chatPage]=await Promise.all([
            this.page.waitForEvent("popup"),
            this.page.getByText("Chat with Us").click()
        ])
        return chatPage;

    }

}
export default Home;