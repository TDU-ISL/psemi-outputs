package src;
public class App {
    public static void main(String[] args) {
        AccountManager manager = new AccountManager();

        //データ追加
        manager.addAccount("test1", "abc012", 10);
        manager.addAccount("test2", "wf7bTif2i!", 100);

        //データ表示
        System.out.println("すべてのデータを表示");
        manager.showAccounts();

        //データ更新(上書き)
        manager.addAccount("test1", "ABC012", 12);

        //データ表示(確認用)
        System.out.println("更新後のtest1のデータのみ表示");
        manager.showAccount("test1");

        //データ削除
        System.out.println("削除後のデータを表示");
        manager.deleteAccount("test1");
        manager.deleteAccount("test2");
        manager.showAccounts();

        
    }
}
