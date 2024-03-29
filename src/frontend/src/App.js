import {useState, useEffect} from 'react';
import {getAllStudents, addNewStudent, deleteStudent} from "./client";
import {successNotification, errorNotification} from "./Notification";

import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Spin,
    Empty,
    Button,Tag, Badge, Popconfirm, Radio,Image
} from 'antd';

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import StudentDrawerForm from "./StudentDrawerForm";

import './App.css';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const removeStudent = (studentId, callback) => {
        deleteStudent(studentId).then(() => {
            successNotification("Student deleted", `Student ${studentId} is deleted`);
            callback();
        }).catch(err => {
                   err.response.json().then(res => {
                       console.log(res);
                       errorNotification(
                           "There was an issue",
                           `${res.message} [${res.status}] [${res.error}]`
                       )
                   });
               })
};

const columns = fetchStudents => [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',

    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
     {
            title: 'Actions',
            key: 'actions',
              render: (text, student) =>
                        <Radio.Group>
                            <Popconfirm
                                placement='topRight'
                                title={`Are you sure to delete ${student.name}`}
                                onConfirm={() => removeStudent(student.id, fetchStudents)}
                                okText='Yes'
                                cancelText='No'>
                                <Radio.Button value="small">Delete</Radio.Button>
                            </Popconfirm>
                            <Radio.Button value="small">Edit</Radio.Button>
                        </Radio.Group>

        },
];

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
                setFetching(false);
            })

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (students.length <= 0) {
            return <Empty/>;
        }
        return <>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
            />
            <Table
                dataSource={students}
                columns={columns(fetchStudents)}
                bordered
                title={() =>
                <>
                      <Tag>Number of students</Tag>
                      <Badge count={students.length} className="site-badge-count-4"/>
                       <br/> <br/>
                    <Button
                        onClick={() => setShowDrawer(!showDrawer)}
                        type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                        Add New Student
                    </Button>
                </>
                }
                pagination={{pageSize: 10}}
                scroll={{y: 600}}
                rowKey={student => student.id}
            />
        </>

    }

    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined/>}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                <Image
                    width={100}
                    src="1657458714913](https://user-images.githubusercontent.com/72573914/186020237-c287f738-fef0-4bfa-8ff1-b437e51aacc4.jpg"
                />
            </Footer>
        </Layout>
    </Layout>
}

export default App;