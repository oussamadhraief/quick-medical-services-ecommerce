import AddProductView from "./AddProductView";
import ModifyProductsView from "./ModifyProductsView";
import ViewOrdersView from "./ViewOrdersView";
import ArchivedOrdersView from "./ArchivedOrdersView";

export default function PageView({ selected }){

    function decideSelection(){
        switch (selected) {
            case 1:
                return <AddProductView />
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
        <div className="flex-grow p-5 w-full h-screen">
            {decideSelection()}
        </div>
    )
}