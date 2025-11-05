import React from "react";
import { View, Text, Pressable, Linking } from "react-native";
import {
  FileText,
  FileImage,
  FileArchive,
  FileSpreadsheet,
  File,
} from "lucide-react-native";

type Attachment = {
  name: string;
  url: string;
};

type Props = {
  resources: Attachment[];
};

const AttachmentsList = ({ resources }: Props) => {
  if (!resources || resources.length === 0) return null;

  const getFileIcon = (ext?: string) => {
    const type = ext?.toLowerCase();

    if (type === "pdf") return <FileText size={18} color="#ef4444" />;
    if (["doc", "docx"].includes(type as string)) return <FileText size={18} color="#2563eb" />;
    if (["xls", "xlsx", "csv"].includes(type as string)) return <FileSpreadsheet size={18} color="#22c55e" />;
    if (["png", "jpg", "jpeg", "gif", "svg"].includes(type as string)) return <FileImage size={18} color="#a855f7" />;
    if (["zip", "rar"].includes(type as string)) return <FileArchive size={18} color="#f59e0b" />;

    return <File size={18} color="#6b7280" />;
  };

  return (
    <View className="px-4">
      <Text className="font-semibold mb-2">Attachments & Resources</Text>

      <View className="flex-row flex-wrap justify-between">
        {resources.map((a, idx) => {
          const ext = a.url?.split(".").pop() || "";
          const icon = getFileIcon(ext);

          return (
            <Pressable
              key={idx}
              onPress={() => a.url && Linking.openURL(a.url)}
              className="w-[48%] border border-neutral-300 px-3 py-3 mb-3 rounded-xl flex-row items-center bg-white active:opacity-80"
            >
              {icon}
              <View className="ml-2 flex-1">
                <Text
                  numberOfLines={1}
                  className="text-sm text-neutral-800 font-medium"
                >
                  {a.name || `File.${ext}`}
                </Text>
                {ext && (
                  <Text className="text-xs text-neutral-500 uppercase mt-0.5">
                    {ext}
                  </Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default AttachmentsList;
