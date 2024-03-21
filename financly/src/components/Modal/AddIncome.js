import React from "react";
import { Modal, Form, Select, Button, Input } from "antd";


const AddIncome = ({incomeModel, handleIncome, onFinish}) => {


   
    const [form] = Form.useForm();
  return (
    <Modal visible={incomeModel} onCancel={handleIncome} title="Add Income">
      <Form
        form={form}
        onFinish={(values) => {
          onFinish(values, "Income");
          form.resetFields();
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="freelance">Freelance</Select.Option>
                <Select.Option value ="investment">Investment</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item>

            <Button htmlType="submit">Add Income</Button>
            
            </Form.Item>
      </Form>
    </Modal>
  );
}
export default AddIncome;