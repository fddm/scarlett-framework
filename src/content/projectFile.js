/**
 * Project File class
 */
class ProjectFile {

    //#region Constructors

    /**
     *
     * @param params
     * @constructor
     */
    constructor(params) {
        params = params || {};

        this.name = params.name || "New Project";
        this.settings = params.settings || {};
        this.content = params.content || {
                scripts: []
            };
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    /**
     *
     * @param data
     * @returns {ProjectFile}
     */
    static restore(data) {
        return new ProjectFile(data);
    }

    //#endregion

    //#endregion

}