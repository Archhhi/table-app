import React, { useEffect, useMemo, useState } from 'react'
import './styles.css'
import { DataType, Product } from './types'
import { getDocuments1, getDocuments2, postCancel } from './api'
import { Badge, Button, Popconfirm, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Search from './Search'

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: 'Sum',
    dataIndex: 'sum'
  },
  {
    title: 'Qty',
    dataIndex: 'qty'
  },
  {
    title: 'Volume',
    dataIndex: 'volume'
  },
  {
    title: 'Delivery date',
    dataIndex: 'delivery_date'
  },
  {
    title: 'Currency',
    dataIndex: 'currency'
  },
  {
    title: 'Total',
    dataIndex: 'total'
  }
]

function App() {
  const [loading, setLoading] = useState<boolean>(false)
  const [items, setItems] = useState<Product[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const products1 = await getDocuments1()
        const products2 = await getDocuments2()

        setItems([...products1, ...products2])
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  function onSelectChange(newSelectedRowKeys: React.Key[]) {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  function onConfirmCancellation() {
    return postCancel(selectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const data: DataType[] = useMemo(
    () =>
      items
        .filter((el) => {
          return el.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        })
        .map((el) => ({
          key: el.id,
          status:
            el.status === 'active' ? (
              <>
                <Badge color={'#52C41A'} />
                &nbsp;
                {el.status}
              </>
            ) : (
              <>
                <Badge color={'#FF4D4F'} />
                &nbsp;
                {el.status}
              </>
            ),
          sum: el.sum.toLocaleString(),
          qty: el.qty.toLocaleString(),
          volume: el.volume.toLocaleString(),
          name: el.name,
          delivery_date: el.delivery_date,
          currency: el.currency,
          total: `${(el.sum * el.qty).toLocaleString()} ${el.currency}`
        }))
        .sort(
          (a, b) =>
            +b.delivery_date.split('.').join('') -
            +a.delivery_date.split('.').join('')
        ),
    [items, searchValue]
  )

  const [volumeSum, qtySum] = useMemo(() => {
    const resultVolume = items.reduce((acc, curr) => acc + curr.volume, 0)
    const resultQty = items.reduce((acc, curr) => acc + curr.qty, 0)
    return [resultVolume, resultQty]
  }, [items])

  const selectedRowNames = useMemo(
    () =>
      items.reduce(
        (acc, curr) =>
          selectedRowKeys.includes(curr.id) ? acc + `${curr.name}, ` : acc,
        ''
      ),
    [items, selectedRowKeys]
  )

  if (loading) {
    return <span>{'Loading...'}</span>
  }

  return (
    <div className={'App'}>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        footer={() => <>{`Volume sum = ${volumeSum}, Qty sum = ${qtySum}`}</>}
      />
      <Popconfirm
        title={`Вы уверены что хотите аннулировать товар(ы)?: ${selectedRowNames}`}
        okText={'Применить'}
        cancelText={'Отклонить'}
        onConfirm={onConfirmCancellation}
      >
        <Button disabled={!selectedRowKeys.length}>Аннулировать</Button>
      </Popconfirm>
    </div>
  )
}

export default App
