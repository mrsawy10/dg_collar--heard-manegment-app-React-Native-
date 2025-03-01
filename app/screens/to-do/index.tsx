import React from "react";
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  useToast,
  NativeBaseProvider,
} from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";
import { t } from "i18next";

const Example = () => {
  const instState = [
    {
      title: "Code",
      isCompleted: true,
    },
    {
      title: "Meeting with team at 9",
      isCompleted: false,
    },
    {
      title: "Check Emails",
      isCompleted: false,
    },
    {
      title: "Write an article",
      isCompleted: false,
    },
  ];
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = React.useState("");
  const toast = useToast();

  const addItem = (title: any) => {
    if (title === "") {
      toast.show({
        title: "Please Enter Text",
        placement: "top",
      });
      return;
    }

    setList((prevList) => {
      return [
        ...prevList,
        {
          title: title,
          isCompleted: false,
        },
      ];
    });
  };

  const handleDelete = (index: any) => {
    setList((prevList) => {
      const temp = prevList.filter((_, itemI) => itemI !== index);
      return temp;
    });
  };

  const handleStatusChange = (index: any) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList[index].isCompleted = !newList[index].isCompleted;
      return newList;
    });
  };

  return (
    <Center w="100%">
      <Box maxW="300" w="100%">
        <Heading mb="2" size="md" className="dark:text-zinc-300">
          {t(`Wednesday`)}
        </Heading>
        <VStack space={4}>
          <HStack space={2}>
            <Input
              flex={1}
              onChangeText={(v) => setInputValue(v)}
              value={inputValue}
              placeholder={t("Add Task")}
              className="dark:bg-zinc-300"
            />
            <IconButton
              borderRadius="sm"
              variant="solid"
              icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />}
              onPress={() => {
                addItem(inputValue);
                setInputValue("");
              }}
              className="bg-teal-700"
            />
          </HStack>
          <VStack space={2}>
            {list.map((item, itemI) => (
              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                key={item.title + itemI.toString()}
              >
                <Checkbox
                  isChecked={item.isCompleted}
                  onChange={() => handleStatusChange(itemI)}
                  value={item.title}
                  className="bg-teal-700"
                  aria-label={item.title}
                ></Checkbox>
                <Text
                  width="100%"
                  flexShrink={1}
                  textAlign="left"
                  className="dark:text-zinc-400"
                  mx="2"
                  strikeThrough={item.isCompleted}
                  _light={{
                    color: item.isCompleted ? "gray.400" : "coolGray.800",
                  }}
                  _dark={{
                    color: item.isCompleted ? "gray.400" : "coolGray.50",
                  }}
                  onPress={() => handleStatusChange(itemI)}
                >
                  {item.title}
                </Text>
                <IconButton
                  size="sm"
                  colorScheme="trueGray"
                  icon={<Icon as={Entypo} name="minus" size="xs" color="trueGray.400" />}
                  onPress={() => handleDelete(itemI)}
                  className="bg-teal-700"
                />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="1" className="justify-start mt-10 items-start">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
