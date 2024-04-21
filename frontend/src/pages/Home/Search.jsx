import React from "react";
import { Avatar, List } from "antd";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Search = ({ _this }) => {
  return (
    <div>
      <div className="relative">
        <div className="relative flex items-center ">
          <form className="w-full ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg dark:placeholder-gray-400 outline-none"
                placeholder="Search....."
                onChange={_this.handleInputChange}
                required
              />
            </div>
          </form>
          <div className="absolute top-[93%] rounded-b px-[30px]  w-full overflow-y-auto bg-[#fdfdfd4f] bg-white z-50 shadow-md">
            {_this.suggestions.length !== 0 && _this.inputValue.length > 0 && (
              <ul className="py-4">
                <List
                  itemLayout="horizontal"
                  dataSource={_this.suggestions}
                  renderItem={(user, index) => (
                    <Link to={`/users/${user?._id}`}>
                      <div className="hover:bg-black/5 px-6 rounded-lg">
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                src={`${
                                  user?.avatar === ""
                                    ? `https://api.dicebear.com/5.x/initials/svg?seed=${user?.first_name}%20${user?.last_name}`
                                    : `${BASE_URL + user?.avatar}`
                                }`}
                              />
                            }
                            title={
                              <p>{user?.first_name + " " + user?.last_name}</p>
                            }
                            description={user?.email}
                            loading={true}
                          />
                        </List.Item>
                      </div>
                    </Link>
                  )}
                />
              </ul>
            )}
            {_this.suggestions.length === 0 && _this.inputValue.length > 0 && (
              <List
                itemLayout="horizontal"
                dataSource={_this.suggestions}
                renderItem={(user, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`${
                            user?.avatar === ""
                              ? `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`
                              : `${BASE_URL + user?.avatar}`
                          }`}
                        />
                      }
                      title={<a href="https://ant.design">{user.first_name}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
