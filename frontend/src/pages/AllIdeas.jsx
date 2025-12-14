import React, { useEffect, useState } from "react";
import { Table } from "antd";
import apiConnector from "../api/ApiConnector";
import { toast } from "react-toastify";

const AllIdeas = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const pageSize = 7; //pageSize means (limit) : how much data we want per page
  const page = 1;

  // 🔹 Fetch ideas from backend
  const fetchIdeas = async (page) => {
    setLoading(true);
    try {
      const response = await apiConnector.get(
        `/idea/get-idea?page=${page}&limit=${pageSize}` // here we are not sending the page and limit in payload because it is a get request not post: so we need to add in query
      );

      setDataSource(response.data.data || []);
      setTotal(response.data.pagination.total);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch ideas"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial load
  useEffect(() => {
    fetchIdeas(currentPage);
  }, [page]);

  const columns = [
    {
      title: "ID",
      key: "serial",
      render: (_, __, index) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Idea",
      dataIndex: "idea",
      key: "idea",
    },
  ];

  return (
    <div className="w-full h-full ">
      <h2 className="text-xl font-medium italic p-3">
        List of all Ideas, We will implement this in our projects.
      </h2>

      <Table className=" bg-white shadow-xl rounded-2xl md:p-6 border border-slate-100"
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize,
          total,
          onChange: (page) => {
            setCurrentPage(page);
            fetchIdeas(page);
          },
        }}
      />
    </div>
  );
};

export default AllIdeas;
