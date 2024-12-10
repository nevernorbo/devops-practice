import { ConfigProvider, Layout, theme } from "antd";
import "./App.css";
import { Footer, Header } from "antd/es/layout/layout";
import { Control } from "./features/content/Control";

const App = () => {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: { colorBgContainer: "#0f0f0f" },
                components: {
                    Statistic: {
                        contentFontSize: 12,
                        titleFontSize: 14,
                    },
                },
            }}
        >
            <Layout
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                }}
            >
                <Header
                    style={{
                        display: "flex",
                        alignItems: "center",
                        height: "56px",
                        gap: 15,
                    }}
                >
                    <img
                        src="../public/icon.svg"
                        alt="icon"
                        height={30}
                        width={30}
                    />
                    <h1>Miiyagi</h1>
                </Header>
                <Control />
                <Footer
                    style={{
                        textAlign: "center",
                        padding: "12px",
                    }}
                >
                    Miiyagi workout notes © {new Date().getFullYear()}
                </Footer>
            </Layout>
        </ConfigProvider>
    );
};

export default App;
