
export default class StyleUtils {

    static header(): any {
        return {...this.card(),  fontSize: "20px", textAlign: "center"};
    }

    static card(): any {
        return {width: "100%", padding: "30px"};
    }
}