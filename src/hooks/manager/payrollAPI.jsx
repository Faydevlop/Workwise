import axiosInstance from '../../config/axiosConfig';

export const getDepartmentWisePayroll = async (userId) => {
  const response = await axiosInstance.get(`/payroll/listdepartmentwise/${userId}`);
  return response.data.users;
};

export const getPayrollViewList = async () => {
  const response = await axiosInstance.get(`/payroll/viewlist`);
  return response.data.listView;
};
