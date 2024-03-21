import React from "react";
import { Modal, Form, Select, Button, Input } from "antd";

const AddExpense = ({ expenseModal, handleExpense, onFinish }) => {

    const [form] = Form.useForm();
  return (
    <Modal visible={expenseModal} onCancel={handleExpense} title="Add Expense">
      <Form
        form={form}
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input your Amount!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input your date",
            },
          ]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Please input your tag",
            },
          ]}
        >
            <Select>
                <Select.Option value="salary">Food</Select.Option>
                <Select.Option value="freelance">Study</Select.Option>
                <Select.Option value ="investment">Movie</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item>

            <Button htmlType="submit">Add Expence</Button>
            
            </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddExpense;
