import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space } from "antd";
import { useCallback, useRef, useState } from "react";
import { get } from "lodash";
import { ProColumnType } from "@ant-design/pro-components";
import { FilterDropdownProps } from "antd/es/table/interface";

/**
 * 用于快速创建Antd Table内，文本类列的搜索属性\
 * 返回一个函数用于创建搜索相关属性\
 * 该函数传入参数类型应为NamePath，支持字符串或字符串数组
 */
const useTableSearch = () => {
  const [, setSearchText] = useState("");
  const [, setSearchedColumn] = useState<string[]>([]);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = useCallback(
    (
      selectedKeys: FilterDropdownProps["selectedKeys"],
      confirm: FilterDropdownProps["confirm"],
      dataIndex: string[]
    ) => {
      confirm();
      setSearchText(selectedKeys[0] as string);
      setSearchedColumn(dataIndex);
    },
    []
  );

  const handleReset = useCallback(
    async (clearFilters: FilterDropdownProps["clearFilters"]) => {
      clearFilters!();
      setSearchText("");
    },
    []
  );

  /**
   * 传入参数类型应为NamePath，支持字符串或字符串数组
   */
  const createColumnSearchProps: (
    dataIndex: string | string[]
  ) => Pick<
    ProColumnType<unknown>,
    "filterDropdown" | "filterIcon" | "onFilter" | "filterDropdownProps"
  > = useCallback(
    (_dataIndex) => {
      const dataIndex = Array.isArray(_dataIndex) ? _dataIndex : [_dataIndex];
      return {
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => (
          <div
            style={{
              padding: 8,
            }}
          >
            <Input
              ref={searchInput}
              placeholder="Search"
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() =>
                handleSearch(selectedKeys, confirm, dataIndex)
              }
              style={{
                marginBottom: 8,
                display: "block",
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                搜索
              </Button>
              <Button
                onClick={() =>
                  clearFilters &&
                  handleReset(clearFilters).then(() => {
                    handleSearch(selectedKeys, confirm, []);
                  })
                }
                size="small"
                style={{
                  width: 90,
                }}
              >
                重置
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? "#1890ff" : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          get(record, dataIndex)
            ?.toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
        filterDropdownProps: {
          onOpenChange: (open) => {
            if (open) {
              setTimeout(() => searchInput.current?.select(), 100);
            }
          },
        },
      };
    },
    [handleSearch, handleReset]
  );

  return createColumnSearchProps;
};

export default useTableSearch;
