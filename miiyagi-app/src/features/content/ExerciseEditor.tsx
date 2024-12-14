import { Form, Input, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleExerciseEditorVisibility } from "./contentSlice";
import {
    addExcercise,
    updateExercise,
    workoutsSelectors,
} from "../workout/workoutsSlice";
import { useEffect } from "react";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 2,
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 4,
        },
    },
};

export const ExcerciseEditor = () => {
    const dispatch = useAppDispatch();

    const exerciseEditorVisible = useAppSelector(
        (state) => state.content.exerciseEditorVisible
    );

    const updatedExerciseId = useAppSelector(
        (state) => state.content.updatedExerciseId
    );

    const updatedExercise = useAppSelector((state) =>
        workoutsSelectors.selectById(state, updatedExerciseId as number)
    );

    const selected_date = useAppSelector(
        (state) => state.calendar.selected_date
    );

    const [form] = Form.useForm();

    useEffect(() => {
        if (updatedExercise) {
            form.setFieldsValue({
                name: updatedExercise.name,
                sets: updatedExercise.sets,
                reps: updatedExercise.repetitions,
            });
        } else {
            form.resetFields();
        }
    }, [updatedExercise]);

    return (
        <Modal
            title="Add new exercise"
            open={exerciseEditorVisible}
            onOk={() => {
                const { name, sets, reps } = form.getFieldsValue();

                if (updatedExerciseId) {
                    dispatch(
                        updateExercise({
                            id: updatedExerciseId,
                            date: selected_date,
                            name: name,
                            sets: Number(sets),
                            repetitions: Number(reps),
                        })
                    );
                } else {
                    dispatch(
                        addExcercise({
                            date: selected_date,
                            name: name,
                            sets: Number(sets),
                            repetitions: Number(reps),
                        })
                    );
                }

                dispatch(toggleExerciseEditorVisibility());

                form.resetFields();
            }}
            onCancel={() => dispatch(toggleExerciseEditorVisibility())}
            okText={updatedExerciseId ? "Update" : "Add"}
        >
            <Form
                layout="horizontal"
                form={form}
                style={{
                    maxWidth: 600,
                }}
                {...formItemLayout}
            >
                <Form.Item
                    name="name"
                    label="Exercise"
                    required={true}
                    {...tailFormItemLayout}
                >
                    <Input placeholder="Push up" />
                </Form.Item>
                <Form.Item name="sets" label="Sets" {...tailFormItemLayout}>
                    <Input placeholder="3" />
                </Form.Item>
                <Form.Item
                    name="reps"
                    label="Repetitions"
                    {...tailFormItemLayout}
                >
                    <Input placeholder="10" />
                </Form.Item>
            </Form>
        </Modal>
    );
};
