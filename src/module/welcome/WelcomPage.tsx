import { Avatar, Card, Empty, List, Space, Timeline, Typography } from "antd";
import { projectHistory } from "./projectHistory";
import { contributorHistory } from "./contributorHistory";
import mashuImg from "./assets/avatar_mashu.png";
import unionImg from "./assets/union.jpg";

const { Title, Paragraph, Text } = Typography;

const WelcomePage = () => {
  return (
    <Card>
      <Typography>
        <Title level={2}>欢迎使用飞艇Wiki ✨🎉✨</Title>

        <Title level={3}>介绍</Title>
        <Paragraph>
          <blockquote>
            起源：“飞艇Wiki”的开发者在游戏飞升97大关后，开始着力于补英雄缘分提升伤害，但苦恼补缘分的优先级，于是制作了一个Excel表格用于计算不同缘分的收益与消耗，并将表格分享给了群友
            <del> 作为工会忘记指挥作战的谢罪（划掉）</del>
            。但可恶的群友竟然表示填开发者制作的Excel表太麻烦了！？是可忍孰不可忍！于是愤怒的开发者一个滑铲，便有了“飞艇Wiki”。
          </blockquote>
        </Paragraph>
        <Paragraph>
          “飞艇Wiki”旨在整合游戏“飞艇英雄”的各类数据与工具，提供一个方便实用的百科全书&工具箱供玩家使用。目前仅开发了一个基础框架，提供英雄图鉴查询功能，后续将提供玩家数据记录功能、并整合原本的“飞艇补缘分自查表”。未来可能会整合更多的工具（画饼）。
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
                <Text strong>右上角工具栏：</Text>
                <li>刷新：离线版暂未开发</li>
                <li>调整列的宽度</li>
                <li>调整列的显示以及展示顺序</li>
              </ul>
            </li>
          </ul>
        </Paragraph>

        <Title level={3}>开发计划</Title>
        <Paragraph>
          <blockquote>
            <ul>
              <b>期待大家帮忙贡献：</b>
              <li>缘分图鉴相关数据录入</li>
              <li>
                英雄图鉴扩充更多数据（初始攻击、满星满发现时的加成数据等）
              </li>
            </ul>
          </blockquote>
          <ul>
            <li>
              <Title level={4}>缘分相关</Title>
              <ul>
                <li>添加缘分图鉴</li>
                <li>开发个人数据保存功能，主要是角色的星级</li>
                <li>添加缘分优先级计算工具</li>
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
        <Paragraph>
          <List
            size="small"
            dataSource={contributorHistory}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
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
        </Paragraph>

        <Title level={3}>版本历史</Title>
        <Paragraph>
          <div
            style={{
              width: 16,
              overflow: "visible",
              whiteSpace: "nowrap",
              marginTop: 24,
            }}
          >
            <Timeline mode="left" items={projectHistory} />
          </div>
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default WelcomePage;
