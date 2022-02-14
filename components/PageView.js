import AddProductView from "./AddProductView";
import ModifyProductsView from "./ModifyProductsView";
import ViewOrdersView from "./ViewOrdersView";
import ArchivedOrdersView from "./ArchivedOrdersView";

export default function PageView({ selected }){

    function decideSelection(){
        switch (selected) {
            case 1:
                return <AddProductView addForm={true} />
                break;
            case 2:
                return <ModifyProductsView /> 
                break;
            case 3:
                return <ViewOrdersView />
                break;
            case 4:
                return <ArchivedOrdersView />
                break;
            default:
                return null
                break;
        }
    }

    return (
        <div className="flex-grow px-5 pb-5 w-full h-full md:h-screen z-30 pt-14 md:pt-5 overflow-auto">
            {decideSelection()}
        </div>
    )
}