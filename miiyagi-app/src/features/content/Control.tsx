import { Layout, Splitter, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { WorkoutCalendar } from "../calendar/WorkoutCalendar";
import { WorkoutDetails } from "../workout/WorkoutDetails";
import { ExcerciseEditor } from "./ExerciseEditor";

export const Control = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Content style={{ padding: "12px" }}>
            <Layout
                style={{
                    height: "100%",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <ExcerciseEditor />
                <Splitter>
                    <Splitter.Panel defaultSize="25%" min="20%" max="40%">
                        <WorkoutCalendar />
                    </Splitter.Panel>
                    <Splitter.Panel>
                        <WorkoutDetails />
                    </Splitter.Panel>
                </Splitter>
            </Layout>
        </Content>
    );
};
