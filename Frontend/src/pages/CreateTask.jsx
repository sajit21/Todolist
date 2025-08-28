import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import userTaskStore from "../store/userTaskStore";

const CreateTask = () => {
  const dotask = userTaskStore((state) => state.dotask);
  const [studentId, setStudentId] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("high");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doTask({
      student_id: studentId,
      title,
      priority,
      status,
      due_date: dueDate,
    });
   

    toast.success("Task created successfully");

    setStudentId("");
    setTitle("");
    setPriority("high");
    setStatus("todo");
    setDueDate("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Assign Task</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Student ID */}
            <div className="grid gap-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                type="text"
                placeholder="Enter student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>

            {/* Task Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Priority Dropdown */}
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border rounded-md p-2"
                required
              >
                <option value="high">High</option>
                <option value="mid">Mid</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border rounded-md p-2"
                required
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="complete">Complete</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              Assign Task
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTask;
