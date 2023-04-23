export const adminMenu = [
  {
    //quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      // {
      //   name: "menu.admin.crud",
      //   link: "/system/user-manage",
      // },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },

      // {
      //   name: "menu.admin.manage-hotel",
      //   link: "/system/user-hotel",
      // },

      // {
      //   name: "menu.admin.manage-admin",
      //   link: "/system/user-admin",
      // },
    ],
  },
  {
    //quản lý phòng khách sạn
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-room",
        link: "/system/manage-room",
      },
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //quản lý chi nhánh
    name: "menu.admin.branch",
    menus: [
      {
        name: "menu.admin.manage-branch",
        link: "/system/manage-hotel",
      },
    ],
  },
  {
    //quản lý lịch đặt phòng
    name: "menu.admin.appointment",
    menus: [
      {
        //quản lý phòng
        name: "menu.room.manage-schedule",
        link: "/room/manage-schedule",
      },
      {
        name: "menu.room.manage-customer",
        link: "/room/manage-customer",
      },
    ],
  },
];

export const roomMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        //quản lý phòng
        name: "menu.room.manage-schedule",
        link: "/room/manage-schedule",
      },
      {
        name: "menu.room.manage-customer",
        link: "/room/manage-customer",
      },
    ],
  },
];
