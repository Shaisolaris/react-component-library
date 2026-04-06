import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "outline", "ghost", "destructive"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: "Button", variant: "primary" } };
export const Secondary: Story = { args: { children: "Button", variant: "secondary" } };
export const Outline: Story = { args: { children: "Button", variant: "outline" } };
export const Loading: Story = { args: { children: "Loading...", isLoading: true } };
export const Small: Story = { args: { children: "Small", size: "sm" } };
export const Large: Story = { args: { children: "Large Button", size: "lg" } };
