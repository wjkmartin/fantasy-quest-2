import actions from "../../../../DataHandlers/redux/actions"

export default {
    // on success, set the sewer map area north of the bars to a basic sewer square. 
   type: "justButton",
   onPress: actions.modifyLocationPropertyById(53, "type", "top")
}