import React, { useMemo } from 'react';
import { Modal, Card, Row, Col } from 'antd';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useShoppingContext } from '../context/ShoppingContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportModal: React.FC = () => {
  const {themeMode} = useTheme()
  const { formatPrice, getCurrencySymbol } = useCurrency();
  const { state, dispatch, getReportData } = useShoppingContext();

  const reportData = useMemo(() => getReportData(), [getReportData]);

  const chartData = useMemo(() => {
    const categories = Object.keys(reportData.categoryTotals);
    const totals = Object.values(reportData.categoryTotals);

    return {
      labels: categories,
      datasets: [
        {
          label: `Total Spending (${getCurrencySymbol()})`,
          data: totals,
          backgroundColor: themeMode === "dark" ? "#91CAFF" : "rgba(54, 162, 235, 0.6)",
          borderWidth: 1,
        },
      ],
    };
  }, [reportData.categoryTotals, getCurrencySymbol]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Removed vertical grid lines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Removed horizontal grid lines
        },
        ticks: {
          callback: function (value: any) {
            return getCurrencySymbol() + value.toFixed(2);
          },
        },
      },
    },
  };

  const handleClose = () => {
    dispatch({ type: 'SET_REPORT_MODAL', payload: false });
  };

  return (
  
    <Modal
      title="Report"
      open={state.isReportModalVisible}
      onCancel={handleClose}
      footer={null}
      width={1000}
      
    >
      <div className={`${themeMode === 'dark'? "bg-black border border-black": "bg-white"}`}>
        {/* Summary Cards */}
        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <Card className="text-center h-full">
              <div className={`text-sm mb-2 ${themeMode === 'dark'? "text-white": "text-black"}`}>
                Total Spending
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {formatPrice(reportData.totalSpending)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {reportData.totalItems} Items in total
              </div>
            </Card>
          </Col>

          <Col span={8}>
            <Card className="text-center h-full">
              <div className={`text-sm mb-2 ${themeMode === 'dark'? "text-white": "text-black"}`}>
                Highest Cost Item
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {reportData.highestCostItem ? formatPrice(reportData.highestCostItem.total) : formatPrice(0)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {reportData.highestCostItem?.name || 'No items'}
                {reportData.highestCostItem && (
                  <span> ({reportData.highestCostItem.quantity} Unit{reportData.highestCostItem.quantity > 1 ? 's' : ''})</span>
                )}
              </div>
            </Card>
          </Col>

          <Col span={8}>
            <Card className="text-center h-full">
              <div className={`text-sm mb-2 ${themeMode === 'dark'? "text-white": "text-black"}`}>
                Average Cost
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {formatPrice(reportData.averageCost)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Per Item
              </div>
            </Card>
          </Col>
        </Row>

        {/* Chart */}
        <>
          <h3 className={`text-lg font-semibold mb-4 text-black ${themeMode === 'dark'? "text-white": "text-black"}`}>
            Sales Report
          </h3> 
          <div style={{ height: '400px' }}>
            {Object.keys(reportData.categoryTotals).length > 0 ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data available for chart
              </div>
            )}
          </div>
        </>
      </div>
    </Modal>
   
  );
};

export default ReportModal;
