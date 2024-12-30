
import WidgetCard from "../components/TopWidgetCard";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import MainWidget from "../components/MainWidget";
import ReactChart from "../../../../../shared/components/ReactCharts/ReactChart";
import AGChart from "../../../../../shared/components/AGCharts/AGCharts";
import StackedBars from "../../../../../shared/components/AGCharts/StckedBars";

import { SprAdminDashContainer, TopWidgetContainer, MainWidgetsContainer } from "./StyledSuperAdminDash";

export default function SuperAdminDashboard() {
    return (
        <SprAdminDashContainer>
            <TopWidgetContainer>
                <WidgetCard
                    icon={<MdOutlinePayments size={25} />}
                    title={'Total Amount'}
                    iconbg={'rgba(217, 217, 254, 0.8)'}
                    value={70000}
                />
                <WidgetCard
                    icon={<FaMoneyBillTransfer
                        size={25}
                        style={{ color: '#6EC207' }}
                    />}
                    title={'Recieved Amount'}
                    iconbg={'rgba(225, 252, 225, 0.8)'}
                    value={70}
                />
                <WidgetCard
                    icon={<FaMoneyBillTransfer
                        size={25}
                        style={{ color: '#000' }}
                    />}
                    iconbg={'#ccc'}
                    title={'Requested Amount'}
                    value={70000}
                />
            </TopWidgetContainer>

            <MainWidgetsContainer>
                <MainWidget
                    width={'49.5%'}
                    height={'50vh'}
                    title={'Created Vendors'}
                >
                    <ReactChart />
                    <AGChart />
                </MainWidget>
                <MainWidget
                    width={'49.5%'}
                    height={'50vh'}
                    title={'Vendors by country'}

                >
                    <StackedBars />
                </MainWidget>
                <MainWidget
                    width={'70%'}
                    height={'70vh'}
                    title={'Gain Transactions by country'}

                />
                <MainWidget
                    width={'29%'}
                    height={'70vh'}
                    title={'Vendors'}

                />
            </MainWidgetsContainer>
        </SprAdminDashContainer>
    )
}