import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { getData } from "../firebasemethods";

export default function SMSelect(props) {
  const {
    label,
    value,
    onChange,
    datasource,
    required,
    displayField,
    valueField,
    nodeName,
  } = props;

  const [dtSource, setDtSource] = useState(datasource);

  let getNodeData = () => {
    if (nodeName) {
      getData(nodeName)
        .then((res) => {
          setDtSource(res);
        })
        .catch((err) => {});
    }
  };
  useEffect(() => {
    getNodeData();
  }, []);

  return (
    <>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        required={required}
        fullWidth={true}
        variant="standard"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        onChange={onChange}
        value={value}
      >
        {dtSource && dtSource.length > 0
          ? dtSource.map((x) => (
              <MenuItem value={x[valueField ? valueField : "id"]}>
                {x[displayField ? displayField : "fullName"]}
              </MenuItem>
            ))
          : null}
      </Select>
    </>
  );
}