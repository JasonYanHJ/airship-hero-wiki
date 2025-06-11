import { Avatar, Card, Empty, List, Space, Timeline, Typography } from "antd";
import { projectHistory } from "./projectHistory";
import { contributorHistory } from "./contributorHistory";
import mashuImg from "./assets/avatar_mashu.png";
import unionImg from "./assets/union.jpg";
import styled from "styled-components";
import { PageContainer } from "@ant-design/pro-components";

const { Title, Paragraph, Text } = Typography;

const StyledListItemMeta = styled(List.Item.Meta)`
  align-items: center !important;
`;

const WelcomePage = () => {
  return (
    <PageContainer title={false}>
      <Card>
        <Title level={2}>欢迎使用飞艇Wiki ✨🎉✨</Title>

        <Title level={3}>介绍</Title>
        <Paragraph>
          <blockquote>
            起源：“飞艇Wiki”的开发者在游戏飞升97大关后，开始着力于补英雄缘分提升伤害，但苦恼补缘分的优先级，于是制作了一个Excel表格用于计算不同缘分的收益与消耗，并将表格分享给了群友
            <del> 作为公会忘记指挥作战的谢罪（划掉）</del>
            。但可恶的群友竟然表示填开发者制作的Excel表太麻烦了！？是可忍孰不可忍！于是愤怒的开发者一个滑铲，便有了“飞艇Wiki”。
          </blockquote>
        </Paragraph>
        <Paragraph>
          “飞艇Wiki”旨在整合游戏“飞艇英雄”的各类数据与工具，提供一个方便实用的百科全书&工具箱供玩家使用，目前有英雄图鉴、缘分图鉴、补缘分自查表等功能。未来可能会整合更多的工具（画饼）。
        </Paragraph>

        <Title level={3}>功能介绍</Title>
        <Paragraph>
          <ul>
            <li>
              <Title level={4}>英雄图鉴</Title>
              <ul>
                <Text strong>基本功能：</Text>
                <li>
                  展示英雄的名称、初始星级、属性、职业、觉醒提升、发现属性
                </li>
                <Text strong>列功能：</Text>
                <li>能够按名称搜索英雄</li>
                <li>能够按各类数据筛选英雄</li>
              </ul>
            </li>
            <li>
              <Title level={4}>缘分图鉴</Title>
              <ul>
                <Text strong>基本功能：</Text>
                <li>
                  展示缘分的名称、每级提升的属性、需要的英雄、以及所需英雄的觉醒数据
                </li>
                <Text strong>列功能：</Text>
                <li>能够按名称搜索缘分</li>
                <li>能够按各类数据筛选缘分</li>
              </ul>
            </li>
            <li>
              <Title level={4}>✨玉石寻宝方案✨</Title>
              <ul>
                <Text strong>基本功能：</Text>
                <li>你可以模拟玉石寻宝的方案选择</li>
                <li>汇总面板会展示目前方案的玉石消耗与收益</li>
                <li>方案数据保存在浏览器本地，支持数据迁移</li>
              </ul>
            </li>
            <li>
              <Title level={4}>✨补缘分自查表✨</Title>
              <blockquote>
                注意：该功能需要玩家先前往“个人数据”页面录入自己的游戏进度数据，以及在“缘分自查表”页面填写自己的面板暴击伤害
              </blockquote>
              <ul>
                <Text strong>基本功能：</Text>
                <li>展示玩家当前游戏进度下，提升缘分的优先级</li>
                <li>
                  表中的每一行代表：将对应缘分在当前游戏进度下提升一级，其觉醒石消耗与收益
                </li>
                <li>
                  游戏进入补缘分阶段后，主要的资源瓶颈是觉醒石，因此表格按照
                  <Text code>每颗觉醒石的提升量</Text>进行排序;
                </li>
                <li>
                  但是注意到<Text code>每5颗觉醒石的提升量</Text>
                  会随着觉醒英雄增多而导致效果稀释，因此优先级还需要综合考虑
                  <Text code>觉醒石消耗量</Text>
                  <br />
                  <blockquote>
                    即：在<Text code>每5颗觉醒石的提升量</Text>
                    大致相当时，消耗了更多觉醒石的组合方案更优质
                  </blockquote>
                </li>
                <li>
                  如上所述，表格将按<Text code>觉醒石消耗量</Text>
                  分为不同的表进行展示。注意，在觉醒石消耗不同时，不可仅比较
                  <Text code>每5颗觉醒石的提升量</Text>。
                </li>
              </ul>
            </li>
            <li>
              <Title level={4}>表格通用功能</Title>
              <ul>
                <Text strong>右上角工具栏：</Text>
                <li>刷新：离线版暂未开发</li>
                <li>调整每行的显示高度</li>
                <li>调整列的显示以及展示顺序</li>
                <Text strong>右下脚页码栏：</Text>
                <li>设置每页展示条数(仅PC端)</li>
              </ul>
            </li>
            <li>
              <Title level={4}>个人数据</Title>
              <ul>
                <Text strong>数据迁移：</Text>
                <li>导出：将保存在浏览器本地的个人数据复制到剪切板</li>
                <li>导入：将导出的数据粘贴的输入框后，能够导入数据</li>
              </ul>
            </li>
            <li>
              <Title level={4}>个人数据-英雄星级</Title>
              <ul>
                <Text strong>基本功能：</Text>
                <li>汇总英雄的养成数据</li>
                <li>汇总英雄的觉醒持有效果</li>
                <li>汇总英雄的缘分达成效果</li>
                <Text strong>数据录入：</Text>
                <li>使用滑动条录入英雄的星级数据</li>
                <li>录入顺序与游戏中英雄图鉴的展示顺序保持一致</li>
                <li>数据保存在设备的浏览器本地，无需重复录入</li>
                <li>
                  录入数据保存时，提供汇总信息，方便与游戏中实际信息核对，确保录入正确
                </li>
                <li>
                  批量设置：当你大部分英雄都为某一星级时，可以使用该功能先将全部英雄设置为该星级，减少操作的次数
                </li>
                <li>
                  重置：将数据录入表单的数据重置为你上一次录入时的星级数据
                </li>
              </ul>
            </li>
          </ul>
        </Paragraph>

        <Title level={3}>开发计划</Title>
        <Paragraph>
          <blockquote>
            <ul>
              <b>期待大家帮忙贡献：</b>
              <li>现有功能的更多相关数据录入</li>
              <li>如果有其他功能idea，准备idea需要的相关数据</li>
            </ul>
          </blockquote>
          <ul>
            <li>
              <Title level={4}>缘分相关</Title>
              <ul>
                <li>添加缘分图鉴 ✅ 🎉</li>
                <li>开发个人数据保存功能，主要是角色的星级 ✅ 🎉</li>
                <li>添加缘分优先级计算工具 ✅ 🎉</li>
                <li>
                  缘分自查表中考虑角色重叠的情况，给出当一次性提升多级缘分时的优先级
                  ✅ 🎉
                </li>
              </ul>
            </li>
            <li>
              <Title level={4}>在线版本</Title>
              <ul>
                <li>
                  <del>找东东白嫖服务器，实现在线页面访问（划掉）</del>
                </li>
              </ul>
            </li>
          </ul>
        </Paragraph>

        <Title level={3}>开发者</Title>
        <Title level={5}>
          <Space>
            <Avatar src={mashuImg} />
            蘑菇骑兵-6服-麻糬
          </Space>
        </Title>
        <Paragraph>
          <blockquote>
            公会：<Text strong>月夜的黑猫团</Text>
            <br />
            欢迎各位大佬加入我们公会！
            <img src={unionImg} style={{ height: 160 }} />
          </blockquote>
        </Paragraph>
        <Paragraph>
          对此项目有任何想法、<Text strong>贡献意愿</Text>
          、bug反馈都可联系我！
          <blockquote>
            <ul>
              联系方式：
              <li>Email: jasonyan1031@foxmail.com</li>
              <li>QQ: 576187975</li>
            </ul>
          </blockquote>
        </Paragraph>

        <Title level={3}>贡献者列表</Title>
        <List
          size="small"
          dataSource={contributorHistory}
          style={{ marginBottom: "1rem" }}
          renderItem={(item) => (
            <List.Item style={{ padding: "12px 0" }}>
              <StyledListItemMeta
                avatar={<Avatar src={item.avatar} />}
                title={item.name}
                description={item.description}
              />
            </List.Item>
          )}
          locale={{
            emptyText: <Empty description="暂无数据，期待大家的贡献！" />,
          }}
        />

        <Title level={3}>版本历史</Title>
        <Timeline
          mode="left"
          style={{ marginTop: "1.5rem" }}
          items={projectHistory}
        />
      </Card>
    </PageContainer>
  );
};

export default WelcomePage;
