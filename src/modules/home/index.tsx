import React, { useEffect, useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import './index.scss';
import { postRequest } from 'network';

function Home({ history }: any) {
  const [dataSource, setDataSource] = useState<any[]>([]);

  const columns = [
    {
      title: '名字',
      key: 'name',
      dataIndex: 'typeName',
    },
    {
      title: '图片',
      key: 'image',
      dataIndex: 'image',
      render: (imgUrl) => {
        return <img style={{ width: 30 }} src={imgUrl} alt="" />;
      },
    },
  ] as TableColumnsType<any>;

  useEffect(() => {
    postRequest('/tableData')
      .then((res: any) => {
        const { data } = res;
        setDataSource(data.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="main">
      <p>this is default home page</p>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default Home;
