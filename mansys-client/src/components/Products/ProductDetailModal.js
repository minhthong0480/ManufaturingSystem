import { Descriptions, Modal, List, Typography } from "antd";
import moment from "moment";
const { Text } = Typography;
const ProductDetail = (props) => {
  const { isModalOpen, record, setIsModalDetailOpen, dataCategory } = props;
  const { name, price, createDate, supplier, category_id } = record;
  console.log(record);
  const dataMaterial = [
    {
      title: "Mặt bàn gỗ ",
      description: "20cm*80cm*18mm",
    },
    {
      title: "gỗ làm kệ",
      description: "40cm*80cm*18mm",
    },
  ];
  const items = [
    {
      key: "1",
      label: "Tên sản phẩm",
      children: name,
    },
    {
      key: "2",
      label: "Giá",
      span: 2,
      children:
        Math.round(price)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " VND",
    },
    {
      key: "4",
      label: "Ngày tạo",
      children: moment(createDate).format("DD/MM/YYYY"),
    },
    {
      key: "5",
      label: "Nhà cung cấp",
      span: 2,
      children: supplier,
    },
    {
      key: "6",
      label: "Ngành hàng",
      span: 3,
      children:
        dataCategory.find((f) => f.id == category_id)?.name || "không có",
    },
    {
      key: "7",
      label: "Nguyên vật liệu",
      children: (
        <List
          itemLayout="horizontal"
          dataSource={dataMaterial}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.description}
              />
              <Text>Số lượng : 1</Text>
            </List.Item>
          )}
        />
      ),
    },
  ];

  const handleOk = () => {
    setIsModalDetailOpen(false);
  };
  const handleCancel = () => {
    setIsModalDetailOpen(false);
  };
  return (
    <Modal
      title="Thông tin chi tiết sản phẩm"
      width="60vw"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={false}
    >
      <Descriptions bordered items={items} />
    </Modal>
  );
};
export default ProductDetail;
