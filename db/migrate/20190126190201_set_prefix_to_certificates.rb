class SetPrefixToCertificates < ActiveRecord::Migration[5.0]
  def self.up
    Information.find(2).update_column(:content, "XPE")
  end

  def self.down
  end
end
