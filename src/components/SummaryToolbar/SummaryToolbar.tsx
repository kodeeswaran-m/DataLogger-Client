import { Search, Plus, ArrowDownToLine } from "lucide-react";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import "./SummaryToolbar.css";
import ColumnPicker from "../ColumnPicker/ColumnPicker";
import { Tooltip } from "@mui/material";

interface SummaryToolbarProps {
  showSearch: boolean;
  setShowSearch: (v: boolean) => void;
  search: string;
  setSearch: (v: string) => void;
  filters: any;
  setFilters: (v: any) => void;
  showPicker: boolean;
  setShowPicker: (v: boolean) => void;
  allSelected: boolean;
  toggleSelectAll: () => void;
  selectedColumns: string[];
  toggleColumn: (key: string) => void;
  columns: any[];
  onAddNew: () => void;
  total: number;
  onDownloadClick: () => void;
  loading: boolean; 
}

export default function SummaryToolbar({
  showSearch,
  setShowSearch,
  search,
  setSearch,
  filters,
  setFilters,
  showPicker,
  setShowPicker,
  allSelected,
  toggleSelectAll,
  selectedColumns,
  toggleColumn,
  columns,
  onAddNew,
  total,
  onDownloadClick,
  loading
}: SummaryToolbarProps) {
  return (
    <div className="summary-toolbar">
      {/* Search */}
      <div className="toolbar-item-left">
        <Tooltip title="search">
          <button
            className="icon-btn "
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search size={18} />
          </button>
        </Tooltip>

        {showSearch && (
          <input
            type="text"
            className="search-input "
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </div>

      <div className="toolbar-item-right">

        <ColumnPicker
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          allSelected={allSelected}
          toggleSelectAll={toggleSelectAll}
          selectedColumns={selectedColumns}
          toggleColumn={toggleColumn}
          columns={columns}
        />

        <FilterDropdown filters={filters} setFilters={setFilters} />

        <Tooltip title="total records">
          <span className="total-txt">Total : {total}</span>
        </Tooltip>

        <Tooltip title="download">
          <button
            className="add-btn"
            onClick={onDownloadClick}
            disabled={loading}       // disable button while loading
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {loading ? (
              <div className="spinner" /> // small loader icon
            ) : (
              <ArrowDownToLine size={18} />
            )}
          </button>
        </Tooltip>

        <Tooltip title="add new">
          <button className="add-btn" onClick={onAddNew}>
            <Plus size={18} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}




// import { Search, Plus, ArrowDownToLine } from "lucide-react";
// import FilterDropdown from "../FilterDropdown/FilterDropdown";
// import "./SummaryToolbar.css";
// import ColumnPicker from "../ColumnPicker/ColumnPicker";
// import { Tooltip } from "@mui/material";
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// interface SummaryToolbarProps {
//   showSearch: boolean;
//   setShowSearch: (v: boolean) => void;
//   search: string;
//   setSearch: (v: string) => void;
//   filters: any;
//   setFilters: (v: any) => void;
//   showPicker: boolean;
//   setShowPicker: (v: boolean) => void;
//   allSelected: boolean;
//   toggleSelectAll: () => void;
//   selectedColumns: string[];
//   toggleColumn: (key: string) => void;
//   columns: any[];
//   onAddNew: () => void;
//   total: number;
//   onDownloadClick: ()=>void
// }

// export default function SummaryToolbar({
//   showSearch,
//   setShowSearch,
//   search,
//   setSearch,
//   filters,
//   setFilters,
//   showPicker,
//   setShowPicker,
//   allSelected,
//   toggleSelectAll,
//   selectedColumns,
//   toggleColumn,
//   columns,
//   onAddNew,
//   total,
//   onDownloadClick
// }: SummaryToolbarProps) {
//   return (
//     <div className="summary-toolbar">
//       {/* Search */}
//       <div className="toolbar-item-left">
//         <Tooltip title="search">
//           <button
//             className="icon-btn "
//             onClick={() => setShowSearch(!showSearch)}
//           >
//             <Search size={18} />
//           </button>
//         </Tooltip>

//         {showSearch && (
//           <input
//             type="text"
//             className="search-input "
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         )}
//       </div>
//       <div className="toolbar-item-right">
//         <ColumnPicker
//           showPicker={showPicker}
//           setShowPicker={setShowPicker}
//           allSelected={allSelected}
//           toggleSelectAll={toggleSelectAll}
//           selectedColumns={selectedColumns}
//           toggleColumn={toggleColumn}
//           columns={columns}
//         />
//         <FilterDropdown filters={filters} setFilters={setFilters} />

//         {/* <Tooltip title="sort">
//           <button className="icon-btn ">
//             <ArrowUpDown size={18} />
//           </button>
//         </Tooltip> */}
//         <Tooltip title="total records">
//           <span className="total-txt">Total : {total}</span>
//         </Tooltip>
//         <Tooltip title="download">
//           <button className="add-btn" onClick={onDownloadClick}>
//             {/* <FileDownloadIcon /> */}
//             <ArrowDownToLine size={18}/>
//           </button>
//         </Tooltip>
//         <Tooltip title="add new">
//           <button className="add-btn" onClick={onAddNew}>
//             <Plus size={18} />
//           </button>
//         </Tooltip>
//       </div>
//     </div>
//   );
// }
