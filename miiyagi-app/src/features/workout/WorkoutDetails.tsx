import {
    Button,
    Col,
    Divider,
    Flex,
    Layout,
    List,
    Popconfirm,
    Row,
    Statistic,
    theme,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    deleteExercise,
    getExercisesForDate,
    workoutsSelectors,
} from "./workoutsSlice";
import { useEffect } from "react";
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import { toggleExerciseEditorVisibility } from "../content/contentSlice";

const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

export const WorkoutDetails = () => {
    const dispatch = useAppDispatch();

    const {
        token: { colorBgContainer, borderRadiusLG, borderRadius },
    } = theme.useToken();

    const selected_date = useAppSelector(
        (state) => state.calendar.selected_date
    );

    const loading = useAppSelector((state) => state.workouts.loading);
    const list = useAppSelector(workoutsSelectors.selectAll);
    console.log(list);

    useEffect(() => {
        dispatch(getExercisesForDate(selected_date));
    }, [selected_date]);

    return (
        <Layout style={{ height: "100%" }}>
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                }}
            >
                <Header
                    style={{
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: colorBgContainer,
                        borderTopRightRadius: borderRadiusLG,
                    }}
                >
                    <h3>
                        {new Date(selected_date).toLocaleDateString(
                            "en-ca",
                            options
                        )}
                    </h3>
                    <Button
                        onClick={() =>
                            dispatch(toggleExerciseEditorVisibility())
                        }
                        icon={<PlusCircleOutlined />}
                    >
                        Add exercise
                    </Button>
                </Header>
                <Divider style={{ margin: 0 }} />
            </div>
            <Content
                style={{
                    padding: 5,
                    backgroundColor: colorBgContainer,
                }}
            >
                <List
                    itemLayout="horizontal"
                    loading={loading}
                    style={{
                        backgroundColor: "black",
                        borderRadius: borderRadius,
                        marginBottom: 5,
                    }}
                    dataSource={list}
                    renderItem={(item) => (
                        <List.Item
                            className="exercise-item"
                            style={{ padding: "10px 20px" }}
                            actions={[
                                <Flex gap={20}>
                                    <EditOutlined
                                        className="icon"
                                        key="list-item-edit"
                                    />
                                    <Popconfirm
                                        title="Delete exercise"
                                        description="Are you sure to delete this exercise?"
                                        onConfirm={() =>
                                            dispatch(deleteExercise(item.id))
                                        }
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined
                                            className="icon"
                                            key="list-item-delete"
                                        />
                                    </Popconfirm>
                                </Flex>,
                            ]}
                        >
                            <List.Item.Meta
                                title={item.name}
                                description={
                                    <Row gutter={16}>
                                        <Col span={5}>
                                            <Statistic
                                                title="Sets"
                                                value={item.sets}
                                            />
                                        </Col>
                                        <Col span={5}>
                                            <Statistic
                                                title="Repetitions"
                                                value={item.repetitions}
                                            />
                                        </Col>
                                    </Row>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Content>
        </Layout>
    );
};
