import {ScrollView, StyleSheet} from "react-native";
import Markdown from "react-native-markdown-display";

/*
Rich text editor for src news
 */
const RichTextEditor = ({body}: {body: string}) => {
  return(
    <ScrollView contentInsetAdjustmentBehavior={"automatic"}>
      <Markdown style={markdownStyles}>
        {body}
      </Markdown>
    </ScrollView>
  )
}
export default RichTextEditor;

const markdownStyles = StyleSheet.create({
  body: {
    color: "#333",
    fontSize: 16,
    lineHeight: 24,
  },
  heading1: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 4,
  },
  heading2: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 2,
  },
  heading3: {
    fontSize: 16,
    fontWeight: "300",
    marginTop: 2,
  },
  link: {
    color: "#2563EB",
    textDecorationLine: "underline",
  },
  listItem: {
    marginVertical: 4,
  },
});
