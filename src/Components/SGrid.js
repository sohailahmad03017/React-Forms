import './SGridStyling.css'

function SMGrid(props) {
    const { dataSource, Cols } = props;
  
  
    return (
      <>
        {Cols && Array.isArray(Cols) && (
          <table style={{ width: "100%" }} cellSpacing='0'>
            <thead>
              <tr>
                <th>Serial No.</th>
                {Cols.map((y, i) => (
                  <th key={i}>{y.displayName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataSource &&
              Array.isArray(dataSource) &&
              dataSource.length > 0 ? (
                dataSource.map((x, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    {Cols.map((y, ind) => (
                      <td key={ind}>{x[y.key]}</td>
                    ))}
                  </tr>
                ))
              ) : null}
            </tbody>
          </table>
        )}
      </>
    );
  }
  export default SMGrid;
  